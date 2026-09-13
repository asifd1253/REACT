import { IMAGE_CDN_URL } from "../utils/constants";

const MenuCategory = ({ categoryName, curCategoryItems }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-6">
      {/* Category Heading */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
        <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
          {categoryName}
        </h2>

        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500 ring-1 ring-slate-200">
          {curCategoryItems.length} items
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-slate-100">
        {curCategoryItems.map((item, index) => {
          const price = item.price || item.defaultPrice;

          return (
            <div
              key={`${item.id}-${index}`}
              className="flex flex-col gap-5 px-5 py-6 transition-colors hover:bg-slate-50/80 sm:flex-row sm:justify-between sm:px-6"
            >
              {/* Items left part */}
              <div className="min-w-0 flex-1">
                {/* Veg / Non-Veg */}
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
                      item.isVeg ? "border-emerald-600" : "border-rose-600"
                    }`}
                  >
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.isVeg ? "bg-emerald-600" : "bg-rose-600"
                      }`}
                    ></span>
                  </span>

                  <span
                    className={`text-xs font-bold uppercase tracking-wide ${
                      item.isVeg ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {item.isVeg ? "Veg" : "Non veg"}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold leading-snug text-slate-950">
                  {item.name}
                </h3>

                {/* Price */}
                {price && (
                  <p className="mt-2 text-base font-bold text-slate-800">
                    ₹{(price / 100).toFixed(0)}
                  </p>
                )}

                {/* Rating */}
                {item.ratings?.aggregatedRating?.rating && (
                  <p className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                    ★ {item.ratings.aggregatedRating.rating}
                  </p>
                )}

                {/* Description */}
                {item.description && (
                  <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                )}
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
    </article>
  );
};

export default MenuCategory;
