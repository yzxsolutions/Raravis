"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import FilterTabs from "@/components/FilterTabs";
import FoodCard from "@/components/FoodCard";
import BottomSheet from "@/components/BottomSheet";
import SelectedItemsBottomSheet from "@/components/SelectedItemsBottomSheet";
import { Mic, Search } from "lucide-react";

// Sample product data (replace with actual data source)
const products = [
  { id: 1, category: "Eat", image: "/images/food/1.jpeg", title: "Avocado and Egg Toast", rating: 4.9, reviews: 120, price: 10.4 },
  { id: 2, category: "Eat", image: "/images/food/2.jpeg", title: "Mac and Cheese", rating: 4.9, reviews: 120, price: 10.4 },
  { id: 3, category: "Drink", image: "/images/food/3.jpeg", title: "Iced Coffee", rating: 4.7, reviews: 80, price: 5.0 },
  { id: 4, category: "Dessert", image: "/images/food/4.jpeg", title: "Chocolate Cake", rating: 4.8, reviews: 100, price: 8.0 },
  { id: 5, category: "Snacks", image: "/images/food/5.jpeg", title: "Chips and Dip", rating: 4.6, reviews: 90, price: 6.0 },
  { id: 6, category: "Breakfast", image: "/images/food/6.jpeg", title: "Pancakes", rating: 4.7, reviews: 110, price: 7.5 },
  { id: 7, category: "Vegan", image: "/images/food/7.jpeg", title: "Vegan Salad", rating: 4.8, reviews: 85, price: 9.0 },
];

// All available categories, including "All"
const allCategories = ["All", "Eat", "Drink", "Dessert", "Snacks", "Breakfast", "Vegan"];

export default function HomePage() {
  const [showHeader, setShowHeader] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCategoryBottomSheetOpen, setIsCategoryBottomSheetOpen] = useState(false);
  const [isSelectedItemsBottomSheetOpen, setIsSelectedItemsBottomSheetOpen] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState(allCategories.slice(0, 3));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const productListRef = useRef(null);

  // Filter products based on search query and active category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle item selection
  const handleSelectItem = (product) => {
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === product.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Update activeCategory based on search results
  useEffect(() => {
    if (searchQuery && filteredProducts.length > 0 && activeCategory === "All") {
      const firstMatchCategory = filteredProducts[0].category;
      if (firstMatchCategory !== activeCategory) {
        setActiveCategory(firstMatchCategory);
        if (!visibleCategories.includes(firstMatchCategory)) {
          setVisibleCategories([firstMatchCategory, ...visibleCategories.filter(c => c !== firstMatchCategory).slice(0, 2)]);
        }
      }
    }
  }, [searchQuery, filteredProducts, activeCategory, visibleCategories]);

  // Dynamically adjust product list height and scrolling
  useEffect(() => {
    const adjustHeight = () => {
      if (productListRef.current) {
        const viewportHeight = window.innerHeight;
        const stickyElementsHeight = !showHeader ? 120 : 0;
        const bottomSheetHeight = selectedItems.length > 0 ? 60 : 0;
        const availableHeight = viewportHeight - stickyElementsHeight - bottomSheetHeight;

        const contentHeight = productListRef.current.scrollHeight;

        if (filteredProducts.length === 1) {
          productListRef.current.style.height = `${contentHeight}px`;
          productListRef.current.style.overflow = "hidden";
        } else {
          productListRef.current.style.minHeight = `${availableHeight}px`;
          productListRef.current.style.height = "auto";
          productListRef.current.style.overflow = "auto";
        }
      }
    };

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, [filteredProducts, showHeader, selectedItems]);

  // Handle scroll for header visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    if (!visibleCategories.includes(category)) {
      setVisibleCategories([category, ...visibleCategories.filter(c => c !== category).slice(0, 2)]);
    }
    setIsCategoryBottomSheetOpen(false);
    setSearchQuery("");
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-[200vh] bg-gray-50">
      {showHeader && <Header />}

      <div className="sticky top-0 z-50 bg-gray-50">
        {!showHeader && (
          <div className="relative p-4">
            <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for food or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 text-black pr-12 py-4 text-lg rounded-full border border-gray-200 bg-white placeholder-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-8 flex items-center">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <Mic className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div className="px-2 pb-3">
          <FilterTabs
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            setIsBottomSheetOpen={setIsCategoryBottomSheetOpen}
            isBottomSheetOpen={isCategoryBottomSheetOpen}
            visibleCategories={visibleCategories}
            allCategories={allCategories}
            handleCategorySelect={handleCategorySelect}
          />
        </div>
      </div>

      <div ref={productListRef} className="mt-6 px-4 space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <FoodCard
              key={product.id}
              image={product.image}
              title={product.title}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
              isSelected={selectedItems.some((item) => item.id === product.id)}
              onSelect={() => handleSelectItem(product)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No products found for "{searchQuery || activeCategory}".
          </p>
        )}
      </div>

      <BottomSheet
        isOpen={isCategoryBottomSheetOpen}
        onClose={() => setIsCategoryBottomSheetOpen(false)}
        categories={allCategories}
        activeCategory={activeCategory}
        setActiveCategory={handleCategorySelect}
      />

      {selectedItems.length > 0 && (
        <SelectedItemsBottomSheet
          isOpen={isSelectedItemsBottomSheetOpen}
          setIsOpen={setIsSelectedItemsBottomSheetOpen}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      )}
    </main>
  );
}