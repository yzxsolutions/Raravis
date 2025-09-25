"use client";
import Image from "next/image";
import BottomSheet from "./BottomSheet";

export default function FilterTabs({
  showSearch,
  showHeader,
  activeCategory,
  setActiveCategory,
  setIsBottomSheetOpen,
  isBottomSheetOpen,
  visibleCategories,
  allCategories,
  handleCategorySelect,
}) {
  return (
    <div className="px-4 mt-6">
      {/* Heading */}
      {!showSearch && showHeader && (
        <h2 className="text-[26px] font-sans font-medium text-gray-800 mb-4">
          We think you might enjoy these specially selected dishes
        </h2>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center">
        {/* Tabs */}
        <div className="flex items-center space-x-3">
          {visibleCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-base ${
                activeCategory === category ? "bg-red-500 font-bold text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Divider taking remaining space */}
        <div className="flex-1 flex justify-center">
          <div className="w-px h-8 bg-[#EAEAEF]" />
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="p-3 rounded-lg bg-white shadow-sm-grey text-[#A5A5BA] hover:bg-gray-200 ml-4"
        >
          <Image src="/images/svg/hamburger.svg" alt="Menu" width={25} height={25} />
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        categories={allCategories}
        activeCategory={activeCategory}
        setActiveCategory={handleCategorySelect}
      />
    </div>
  );
}