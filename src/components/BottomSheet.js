"use client";
import { useEffect } from "react";

export default function BottomSheet({ isOpen, onClose, categories, activeCategory, setActiveCategory }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".bottom-sheet")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-20 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bottom-sheet fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 transform transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Select Category</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-base ${
                activeCategory === category ? "bg-red-100 text-red-500 font-semibold" : "bg-gray-100 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}