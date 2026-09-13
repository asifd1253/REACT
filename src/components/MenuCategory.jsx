import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const MenuCategory = ({ categoryName, curCategoryItems }) => {
  return (
    <article className="border rounded-2xl mb-6 border-slate-200 bg-white shadow-sm">
      {/* Category Heading details */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
        <p className="text-lg font-bold text-slate-950 sm:text-xl">
          {categoryName}
        </p>
        <span className="bg-white rounded-full text-xs px-3 py-1 font-bold shrink-0 tracking-wide ring-1 uppercase">
          {curCategoryItems.length} Items
        </span>
      </div>

      {/*  Category Multiple Items*/}
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
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border ${curItem.isVeg ? "border-emerald-600" : "border-rose-600"}`}
                  >
                    {/* inside dot */}
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${curItem.isVeg ? "bg-emerald-600" : "bg-rose-600"}`}
                    ></span>
                  </span>
                  <span
                    className={`font-bold uppercase tracking-wide text-xs ${curItem.isVeg ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {curItem.isVeg ? "Veg" : "Non-veg"}
                  </span>
                </div>

                {/* curItem name */}
                <div className="text-lg font-bold text-slate-950 leading-snug">
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
                <button className="rounded-xl absolute -bottom-4 left-1/2 -translate-x-1/2 border border-emerald-200 bg-white px-6 py-2 text-sm font-extrabold text-emerald-700 shadow-lg hover:bg-emerald-50">
                  ADD
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default MenuCategory;
