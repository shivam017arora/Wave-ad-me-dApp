import React from "react";

export default function Counter({ number, desc }) {
  return (
    <div className="counter-box">
      <span className="counter-title">{number}</span>
      <span className="counter-desc">{desc}</span>
    </div>
  );
}
