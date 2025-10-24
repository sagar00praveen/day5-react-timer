// src/App.jsx
import React from "react";
import Timer from "./components/Timer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        ⏱ React Timer
      </h1>
      <Timer />
    </div>
  );
}
