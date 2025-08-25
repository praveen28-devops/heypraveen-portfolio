import React from "react";

const Praveen3DText = () => (
  <div style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
    opacity: 0.92,
    background: "none"
  }}>
    <svg
      width="600"
      height="180"
      viewBox="0 0 600 180"
      style={{ filter: "drop-shadow(0 12px 32px #0ff3) drop-shadow(0 2px 8px #0008)" }}
    >
      <defs>
        <linearGradient id="metallic" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0e6ed" />
          <stop offset="30%" stopColor="#b0beca" />
          <stop offset="60%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
        <radialGradient id="gloss" cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="18" stdDeviation="12" floodColor="#0ff" floodOpacity="0.18"/>
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.25"/>
        </filter>
      </defs>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontFamily="'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif"
        fontWeight="900"
        fontSize="120"
        fill="url(#metallic)"
        filter="url(#shadow)"
        style={{
          letterSpacing: "0.08em",
          paintOrder: "stroke",
          stroke: "#0ea5e9",
          strokeWidth: 2,
        }}
      >
        Praveen
      </text>
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontFamily="'Orbitron', 'Montserrat', 'Segoe UI', Arial, sans-serif"
        fontWeight="900"
        fontSize="120"
        fill="url(#gloss)"
        style={{
          letterSpacing: "0.08em",
          mixBlendMode: "screen",
        }}
      >
        Praveen
      </text>
    </svg>
  </div>
);

export default Praveen3DText;
