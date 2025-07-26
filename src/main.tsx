import React from "react";
import ReactDOM from "react-dom/client";

const App = () => (
  <div style={{ padding: "2rem", fontFamily: "Arial" }}>
    <h1>🎵 OmniPlay</h1>
    <p>A privacy-first, browser-based media player.</p>
  </div>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
