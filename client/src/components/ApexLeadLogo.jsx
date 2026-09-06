import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ApexLeadLogo({
  className = "",
  iconOnly = false,
}) {
  const { theme } = useTheme();

  if (iconOnly) {
    return (
      <img
        src="/apex-logo.png"
        alt="ApexLead"
        className={className}
      />
    );
  }
  return (
    <img
      src={
        theme === "dark"
          ? "/apex-dark.png"
          : "/apex-light.png"
      }
      alt="ApexLead"
      className={className}
    />
  );
}