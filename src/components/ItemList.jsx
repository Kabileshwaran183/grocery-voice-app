export default function ItemList({ items, handleDeleteItem }) {
  if (items.length === 0) return (
    <div className="text-center py-8">
      <p className="text-lg text-neutral-600 mb-2">இன்னும் எந்த பொருளும் சேர்க்கப்படவில்லை</p>
      <p className="text-sm text-neutral-500">மேலே உள்ள மைக்ரோஃபோன் பட்டன்களை பயன்படுத்தவும்</p>
    </div>
  );

  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li
          key={idx}
          className="border border-neutral-200 p-2 rounded-lg shadow-sm flex justify-between items-center bg-white hover:bg-neutral-50 transition-colors duration-200"
        >
          <div>
            <strong className="text-lg text-neutral-800">{item.name}</strong>
            <div className="text-base font-medium text-neutral-700">₹ {item.amount ?? "-"}</div>
          </div>
          <div className="flex h-full">
            <div className="text-sm text-neutral-500 self-center px-2">
              ( {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} )----
              {new Date(item.date).toLocaleDateString()}
            </div>
            <button
              onClick={() => handleDeleteItem(idx)}
              className="flex bg-orange-600 text-white h-full items-center justify-center px-4 hover:bg-orange-700 transition-colors text-2xl"
              aria-label="Delete item"
            >
              <span className="flex items-center pb-2 h-full">×</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}