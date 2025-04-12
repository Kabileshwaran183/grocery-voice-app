import { useState } from "react";
import { startSpeechRecognition } from "../utils/speechUtils";

export default function VoiceButton({ onSpeechResult, label, color }) {
  const [status, setStatus] = useState("idle"); // idle | listening | processing

  const handleClick = () => {
    setStatus("listening");

    startSpeechRecognition(
      (speechText) => {
        setStatus("processing");
        onSpeechResult(speechText);
        setTimeout(() => setStatus("idle"), 1000);
      },
      () => {
        if (status !== "processing") setStatus("idle");
      }
    );
  };

  let buttonText = `🎙️ ${label}`;
  if (status === "listening") buttonText = "🎤 கேட்கிறது...";
  if (status === "processing") buttonText = "⏳ செயலாக்கம்...";

  const isBusy = status !== "idle";

  return (
    <button
      onClick={handleClick}
      disabled={isBusy}
      className={`
        px-6 py-4 text-lg rounded-2xl shadow-md text-white font-semibold
        transition-all duration-200 min-w-40
        ${color} ${isBusy ? "opacity-75 cursor-not-allowed" : "hover:opacity-90 active:scale-95"}
        ${status === "listening" ? "animate-pulse ring-4 ring-opacity-50 ring-neutral-400" : ""}
      `}
      aria-live="polite"
    >
      {buttonText}
    </button>
  );
}
