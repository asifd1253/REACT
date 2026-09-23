import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";
import { useState } from "react";
import { DROPDOWN_ICON } from "../utils/constants";

const MenuCategory = ({ categoryName, curCategoryItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCollapse = () => {
    setIsOpen(!isOpen);
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
            className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center text-xl font-bold text-slate-700 transition-all active:scale-95"
            aria-label={isOpen ? "Collapse category" : "Expand category"}
          >
            {isOpen ? (
              <img src={DROPDOWN_ICON} alt="collapse" />
            ) : (
              <img src={DROPDOWN_ICON} alt="expand" className="rotate-180" />
            )}
          </button>
        </div>
      </div>

      {/*  Category Multiple Items*/}
      {isOpen && (
        <div>
          {curCategoryItems.map((curItem, index) => {
            const price = curItem.price || curItem.defaultPrice;
            return (
              <div
                key={`${curItem.id}-${index}`}
                className="flex flex-col gap-5 px-5 py-6 hover:bg-slate-50/80 sm:flex-row sm:justify-between sm:px-6"
              >
                {/* Items left part */}
                <div className="min-w-0 flex-1">
                  {/* veg / Non-veg */}
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-sm border ${curItem.isVeg ? "border-emerald-600" : "border-rose-600"}`}
                    >
                      {/* inside dot */}
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${curItem.isVeg ? "bg-emerald-600" : "bg-rose-600"}`}
                      ></span>
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wide ${curItem.isVeg ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {curItem.isVeg ? "Veg" : "Non-veg"}
                    </span>
                  </div>

                  {/* curItem name */}
                  <div className="text-lg font-bold leading-snug text-slate-950">
                    {curItem.name}
                  </div>

                  {/* curItem price */}
                  <div>
                    {price && (
                      <p className="mt-2 text-base font-bold text-slate-800">
                        ₹{(price / 100).toFixed(0)}
                      </p>
                    )}
                  </div>

                  {/* rating */}
                  <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                    {curItem.ratings?.aggregatedRating?.rating && (
                      <p>★ {curItem.ratings.aggregatedRating.rating}</p>
                    )}
                  </div>

                  {/* Description (Optional)*/}
                  <div>
                    {curItem.description && (
                      <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-6 text-slate-500">
                        {curItem.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items right part */}
                <div className="relative h-36 w-full shrink-0 sm:w-40">
                  {/* Image */}
                  <div className="h-full w-full">
                    {curItem.imageId ? (
                      <img
                        src={IMAGE_CDN_URL + curItem.imageId}
                        alt={curItem.name}
                        className="h-full w-full rounded-xl object-cover shadow-sm ring-1"
                      />
                    ) : (
                      <p className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-400 ring-1">
                        No Image
                      </p>
                    )}
                  </div>

                  {/* Add button */}
                  <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-xl border border-emerald-200 bg-white px-6 py-2 text-sm font-extrabold text-emerald-700 shadow-lg hover:bg-emerald-50">
                    ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default MenuCategory;
