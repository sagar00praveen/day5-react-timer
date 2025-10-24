// src/components/Timer.jsx
import React, { useEffect, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

export default function Timer() {
  const [time, setTime] = useLocalStorage("timerTime", 0);
  const [isRunning, setIsRunning] = useLocalStorage("timerRunning", false);
  const intervalRef = useRef(null);

  // Start / stop timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, setTime]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem("timerTime");
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center justify-center w-80 border border-gray-100">
      <h2 className="text-5xl font-mono font-bold mb-6 text-gray-900">
        {formatTime(time)}
      </h2>

      <div className="flex gap-3">
        <button
          onClick={start}
          disabled={isRunning}
          className={`px-5 py-2 rounded-lg font-medium text-white transition-all ${
            isRunning
              ? "bg-green-400 opacity-60 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          ▶ Start
        </button>

        <button
          onClick={pause}
          disabled={!isRunning}
          className={`px-5 py-2 rounded-lg font-medium text-white transition-all ${
            !isRunning
              ? "bg-yellow-400 opacity-60 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          ⏸ Pause
        </button>

        <button
          onClick={reset}
          className="px-5 py-2 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition-all"
        >
          🔄 Reset
        </button>
      </div>

      <p className="mt-5 text-sm text-gray-500 italic">
        {isRunning
          ? "⏳ Timer is running..."
          : time > 0
          ? "⏸ Timer paused."
          : "Press start to begin."}
      </p>
    </div>
  );
}
