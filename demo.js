import { useEffect, useState } from "react";
import { IMAGE_CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});

  const { restaurantId } = useParams();
  useEffect(() => {
    fetchMenuData();
  }, [resId]);

  async function fetchMenuData() {
    try {
      const response = await fetch(`${MENU_API}/${resId}.json`);
      const jsObj = await response.json();

      // console.log(jsObj);

      const cards = jsObj?.data?.cards || [];

      // Restaurant information
      const restaurantCard = cards.find((card) => card?.card?.card?.info);

      const info = restaurantCard?.card?.card?.info;

      setRestaurantInfo(info || {});

      // finding the menu in the restaurant
      const regularCard = cards.find(
        (card) => card?.groupedCard?.cardGroupMap?.REGULAR?.cards,
      );

      const regularCards =
        regularCard?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const extractedMenuItems = regularCards.flatMap((card) => {
        const data = card?.card?.card;

        // Normal category
        if (
          data?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          return (
            data.itemCards?.map((item) => ({
              category: data.title,
              ...item.card.info,
            })) || []
          );
        }

        // Nested category
        if (
          data?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        ) {
          return (
            data.categories?.flatMap(
              (category) =>
                category.itemCards?.map((item) => ({
                  category: `${data.title} / ${category.title}`,
                  ...item.card.info,
                })) || [],
            ) || []
          );
        }

        return [];
      });

      setMenuItems(extractedMenuItems);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  // Group items category-wise
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }

    acc[item.category].push(item);

    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Restaurant Header */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 px-6 py-8 text-white sm:px-8">
            {/* Upper part banner */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {/* Restaurant Details */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  {restaurantInfo.cuisines?.join(", ") || "Restaurant Menu"}
                </p>

                <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {restaurantInfo.name || "Restaurant"}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
                  {restaurantInfo.cuisines?.join(", ") ||
                    "Delicious food and beverages"}
                </p>
              </div>

              {/* Restaurant Stats */}
              <div className="grid grid-cols-3 gap-3 text-center sm:min-w-80">
                {/* Rating */}
                <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Rating</p>

                  <p className="mt-1 text-xl font-bold">
                    {restaurantInfo.avgRating || "N/A"}
                  </p>
                </div>

                {/* Area */}
                <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Area</p>

                  <p className="mt-1 text-sm font-bold">
                    {restaurantInfo.areaName || "N/A"}
                  </p>
                </div>

                {/* Items */}
                <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Items</p>

                  <p className="mt-1 text-xl font-bold">{menuItems.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom part banner */}
          <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 px-6 py-4 text-sm text-slate-600 sm:px-8">
            {/* Cuisines */}
            {restaurantInfo.cuisines?.map((cuisine) => (
              <span
                key={cuisine}
                className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700"
              >
                {cuisine}
              </span>
            ))}

            {/* Cost */}
            {restaurantInfo.costForTwoMessage && (
              <span className="rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                {restaurantInfo.costForTwoMessage}
              </span>
            )}
          </div>
        </section>

        {/* Menu Items Started */}
        <section className="mt-8">
          {/* Heading of menu */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Order online
              </p>

              <h2 className="mt-1 text-2xl font-extrabold text-slate-950 sm:text-3xl">
                Complete Menu
              </h2>
            </div>

            <p className="text-sm font-medium text-slate-500">
              {Object.keys(groupedMenu).length} categories available
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            {Object.entries(groupedMenu).map(([categoryName, items]) => (
              <article
                key={categoryName}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Category */}
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
                  <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                    {categoryName}
                  </h2>

                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500 ring-1 ring-slate-200">
                    {items.length} items
                  </span>
                </div>

                {/* Items */}
                <div className="divide-y divide-slate-100">
                  {items.map((item, index) => {
                    const price = item.price || item.defaultPrice;

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex flex-col gap-5 px-5 py-6 transition-colors hover:bg-slate-50/80 sm:flex-row sm:justify-between sm:px-6"
                      >
                        {/* Item Details */}
                        <div className="min-w-0 flex-1">
                          {/* Veg / Non-Veg */}
                          <div className="mb-3 flex items-center gap-2">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-sm border ${
                                item.isVeg
                                  ? "border-emerald-600"
                                  : "border-rose-600"
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
                                item.isVeg
                                  ? "text-emerald-700"
                                  : "text-rose-700"
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

                        {/* Image + Add Button */}
                        <div className="relative h-36 w-full shrink-0 overflow-visible sm:w-40">
                          {item.imageId ? (
                            <img
                              src={IMAGE_CDN_URL + item.imageId}
                              alt={item.name}
                              className="h-full w-full rounded-xl object-cover shadow-sm ring-1 ring-slate-200"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-400 ring-1 ring-slate-200">
                              No image
                            </div>
                          )}

                          <button className="absolute -bottom-4 left-1/2 min-w-28 -translate-x-1/2 rounded-xl border border-emerald-200 bg-white px-6 py-2 text-sm font-extrabold text-emerald-700 shadow-lg hover:bg-emerald-50">
                            ADD
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default RestaurantMenu;
