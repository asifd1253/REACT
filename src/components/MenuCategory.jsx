import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";
import { useState } from "react";
import { DROPDOWN_ICON } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import MenuCategoryItems from "./MenuCategoryItems";

const MenuCategory = ({ categoryName, curCategoryItems }) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();

  const handleAddToCart = (curItem) => {
    dispatch(addItem(curItem));
  };

  return (
    <article className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Category Heading */}
      <div
        onClick={handleCollapse}
        className="flex cursor-pointer items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6"
      >
        <p className="text-lg font-bold text-slate-950 sm:text-xl">
          {categoryName}
        </p>

        <div className="flex items-center gap-3">
          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide ring-1">
            {curCategoryItems.length} Items
          </span>

          {/* Collapse Button */}
          <button
            onClick={handleCollapse}
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-xl font-bold text-slate-700 transition-all"
            aria-label={isOpen ? "Collapse category" : "Expand category"}
          >
            <img
              src={DROPDOWN_ICON}
              alt="expand"
              className={`transform transition-transform duration-300 ${
                isOpen ? "rotate-0" : "-rotate-180"
              }`}
            />
          </button>
        </div>
      </div>

      {/*  Category Multiple Items*/}
      {isOpen && (
        <div>
          {curCategoryItems.map((curItem, index) => (
            <MenuCategoryItems key={`${curItem.id}-${index}`} curItem={curItem} />
          ))}
        </div>
      )}
    </article>
  );
};

export default MenuCategory;
