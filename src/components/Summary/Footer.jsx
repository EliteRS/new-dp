import React from "react";
import "./style.scss";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="summary-footer">
      <p>Copyright ⓒ {year}</p>
    </div>
  );
}
