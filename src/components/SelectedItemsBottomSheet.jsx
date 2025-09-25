"use client";
import Image from "next/image";
import { X } from "lucide-react";

export default function SelectedItemsBottomSheet({ isOpen, setIsOpen, selectedItems, setSelectedItems }) {
  // Handle removing an item from the selected items
  const handleRemoveItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 ">
      {/* Bottom Sheet Preview */}
      <div
        className="bg-green-500 font-bold rounded-full text-white text-center py-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        View {selectedItems.length} Selected Item{selectedItems.length > 1 ? "s" : ""}
      </div>

      {/* Bottom Sheet Content */}
      {isOpen && (
        <div className="bg-white rounded-t-2xl shadow-lg p-4 max-h-[80vh] pb-32 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-black font-semibold">Selected Items ({selectedItems.length})</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          {selectedItems.length > 0 ? (
            <div className="space-y-4">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-lg mr-3"
                    />
                    <div>
                      <h3 className="text-md font-medium text-black">{item.title}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Image src="/images/svg/delete.svg" alt="Remove" width={40} height={40} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No items selected.</p>
          )}
        </div>
      )}
    </div>
  );
}