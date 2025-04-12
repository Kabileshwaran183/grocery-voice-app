import { useState, useEffect } from "react";
import VoiceButton from "./components/VoiceButton";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (speech) => {
    const parsed = parseSpeech(speech);
    if (!parsed) return alert("Couldn't understand input.");

    setItems([...items, { ...parsed, date: new Date().toISOString() }]);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, idx) => idx !== index));
  };

  const parseSpeech = (text) => {
    const match = text.match(/([a-zA-Z]+)\s+(\d+)/);
    if (!match) return null;
    return { name: match[1], amount: parseInt(match[2]) };
  };

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen ">
      <h1 className="text-3xl font-bold mb-8 text-primary-700 flex items-center gap-3">
        <span className="text-xl">🛒</span>
        Grocery Credit Tracker
      </h1>
      
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-8 justify-center">
        <VoiceButton label="Add Item" color="bg-primary-500" onSpeechResult={handleAddItem} />
        <VoiceButton label="Delete Item" color="bg-accent-500" onSpeechResult={handleDeleteItem} />
      </div>

      <ItemList items={items} handleDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default App;
