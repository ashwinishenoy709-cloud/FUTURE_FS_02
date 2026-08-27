const express = require("express");
const Lead = require("../models/Lead");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

// @route  GET /api/analytics/summary
// @desc   Counts by status + conversion rate + leads added in the last 7 days
router.get("/summary", async (req, res) => {
  try {
    const [total, newCount, contactedCount, convertedCount] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
      Lead.countDocuments({ status: "converted" }),
    ]);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const last7Days = await Lead.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

    const conversionRate = total > 0 ? Math.round((convertedCount / total) * 100) : 0;

    res.json({
      total,
      new: newCount,
      contacted: contactedCount,
      converted: convertedCount,
      last7Days,
      conversionRate,
    });
  } catch (err) {
    res.status(500).json({ message: "Could not load analytics", error: err.message });
  }
});

module.exports = router;
