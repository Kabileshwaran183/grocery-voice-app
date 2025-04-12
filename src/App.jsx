// src/App.jsx
import { useState, useEffect } from "react";
import VoiceButton from "./components/VoiceButton";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (speech) => {
    const parsed = parseSpeech(speech);
    if (!parsed) return setStatusMessage("❌ புரியவில்லை. மீண்டும் முயற்சிக்கவும்.");

    setItems([...items, { ...parsed, date: new Date().toISOString() }]);
    setStatusMessage(`✅ சேர்க்கப்பட்டது: ${parsed.name} ₹${parsed.amount ?? "-"}`);
  };

  const handleDeleteItem = (speech) => {
    const parsed = parseSpeech(speech);
    if (!parsed) return setStatusMessage("❌ பொருள் புரியவில்லை.");

    const filtered = items.filter(
      (item) => !(item.name === parsed.name && item.amount === parsed.amount)
    );

    if (filtered.length === items.length) {
      setStatusMessage("⚠️ பொருள் கிடைக்கவில்லை.");
    } else {
      setItems(filtered);
      setStatusMessage(`🗑️ நீக்கப்பட்டது: ${parsed.name} ₹${parsed.amount ?? "-"}`);
    }
  };

  const parseSpeech = (text) => {
    const cleaned = text.replace(/[^\u0B80-\u0BFFa-zA-Z0-9\s]/g, "").trim();
    const words = cleaned.split(" ").filter(Boolean);
    if (words.length === 0) return null;

    let amount = null;
    let name = words.join(" ");

    for (let i = words.length - 1; i >= 0; i--) {
      const maybeAmount = parseInt(words[i]);
      if (!isNaN(maybeAmount)) {
        amount = maybeAmount;
        name = words.slice(0, i).join(" ");
        break;
      }
    }

    return { name: name.trim(), amount };
  };

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-primary-700 flex items-center gap-3">
        <span className="text-xl">🛒</span>
        கடன் பட்டியல் (Grocery Credit Tracker)
      </h1>

      {statusMessage && (
        <div className="text-center text-sm text-gray-700 mb-4">
          {statusMessage}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 justify-center">
        <VoiceButton label="பொருள் சேர்க்கவும்" color="bg-green-600" onSpeechResult={handleAddItem} />
        <VoiceButton label="பொருள் நீக்கவும்" color="bg-red-600" onSpeechResult={handleDeleteItem} />
      </div>

      <ItemList items={items} handleDeleteItem={(index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
        setStatusMessage("🗑️ ஐட்டம் நீக்கப்பட்டது");
      }} />
    </div>
  );
}

export default App;