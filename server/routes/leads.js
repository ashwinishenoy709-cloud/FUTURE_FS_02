const express = require("express");
const Lead = require("../models/Lead");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/public", async (req, res) => {
  try {
    const { name, email, message, source } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      source: source?.trim() || "Website",
      status: "new",
      priority: "medium",
    });

    res.status(201).json({
      message: "Thank you! Our team will contact you soon.",
      leadId: lead._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Could not submit your enquiry",
    });
  }
});

router.use(protect);

// @route  GET /api/leads
// @desc   List leads with optional search + status filter
// query params: q (search text), status (new|contacted|converted), sort (createdAt|-createdAt)
router.get("/", async (req, res) => {
  try {
    const { q, status, sort } = req.query;
    const filter = {};

    if (status && ["new", "contacted", "converted"].includes(status)) {
      filter.status = status;
    }

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), "i");
      filter.$or = [{ name: regex }, { email: regex }, { source: regex }];
    }

    const sortBy = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    const leads = await Lead.find(filter).sort(sortBy);
    res.json({ leads });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch leads", error: err.message });
  }
});

// @route  GET /api/leads/:id
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ lead });
  } catch (err) {
    res.status(500).json({ message: "Could not fetch lead", error: err.message });
  }
});

// @route  POST /api/leads
// @desc   Create a lead (simulates a website contact-form submission landing in the CRM)
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, source, status } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Lead name and email are required" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      source,
      status: status || "new",
      priority,
      followUpDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ lead });
  } catch (err) {
    res.status(500).json({ message: "Could not create lead", error: err.message });
  }
});

// @route  PATCH /api/leads/:id
// @desc   Update lead fields (name, email, phone, source)
router.patch("/:id", async (req, res) => {
  try {
    const { name, email, phone, source } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    if (name !== undefined) lead.name = name;
    if (email !== undefined) lead.email = email;
    if (phone !== undefined) lead.phone = phone;
    if (source !== undefined) lead.source = source;

    await lead.save();
    res.json({ lead });
  } catch (err) {
    res.status(500).json({ message: "Could not update lead", error: err.message });
  }
});

// @route  PATCH /api/leads/:id/status
// @desc   Move a lead through the pipeline: new -> contacted -> converted
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["new", "contacted", "converted"].includes(status)) {
      return res.status(400).json({ message: "Status must be new, contacted or converted" });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json({ lead });
  } catch (err) {
    res.status(500).json({ message: "Could not update status", error: err.message });
  }
});

// @route  POST /api/leads/:id/notes
// @desc   Add a follow-up note to a lead
router.post("/:id/notes", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Note text is required" });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes.push({ text: text.trim() });
    await lead.save();

    res.status(201).json({ lead });
  } catch (err) {
    res.status(500).json({ message: "Could not add note", error: err.message });
  }
});

// @route  DELETE /api/leads/:id/notes/:noteId
router.delete("/:id/notes/:noteId", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes = lead.notes.filter((note) => note._id.toString() !== req.params.noteId);
    await lead.save();

    res.json({ lead });
  } catch (err) {
    res.status(500).json({ message: "Could not delete note", error: err.message });
  }
});

// @route  DELETE /api/leads/:id
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete lead", error: err.message });
  }
});

module.exports = router;
