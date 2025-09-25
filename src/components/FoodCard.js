"use client";
import Image from "next/image";
import { Star } from "lucide-react";

export default function FoodCard({ image, title, rating, reviews, price, isSelected, onSelect }) {
  return (
    <div className="flex bg-white rounded-2xl shadow-sm-grey p-4 mt-4 mx-4">
      <Image
        src={image}
        alt={title}
        width={130}
        height={130}
        className="rounded-lg"
      />

      <div className="flex-1 ml-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-light text-black">{title}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Star className="w-4 h-4 text-red-500 mr-1" />
            <span>{rating} ({reviews} reviews)</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-red-500 font-bold text-lg">${price}</p>
          <button
            onClick={onSelect}
            className={`flex items-center px-4 py-2 rounded-xl text-sm gap-2 ${
              isSelected ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
            } text-white`}
          >
            <Image src="/images/svg/select.svg" alt="Select" width={20} height={20} />
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </div>
  );
}