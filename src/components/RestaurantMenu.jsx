import { useState, useEffect } from "react";
import { MENU_API } from "../utils/constants";
import { useParams } from "react-router";
import MenuCategory from "./MenuCategory";

const RestaurantMenu = () => {
  const { restaurantId } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fectchMenuData();
  }, [restaurantId]);

  async function fectchMenuData() {
    try {
      const response = await fetch(`${MENU_API}/${restaurantId}.json`);
      const data = await response.json();
      // console.log(data);

      const cardsOfArray = data?.data?.cards || [];

      // finding the Restaurant card
      const restaurantCard = cardsOfArray.find((arrayIdx) => {
        return arrayIdx?.card?.card?.info;
      });
      // console.log(restaurantCard);

      const info = restaurantCard?.card?.card?.info;

      setRestaurantInfo(info || {});

      // finding the menu in the restaurant
      const menu = cardsOfArray.find((arrayIdx) => {
        return arrayIdx?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      });

      const menuItems = menu?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const extractedMenuItems = menuItems.flatMap((menuArrayIdx) => {
        const menuData = menuArrayIdx?.card?.card;

        // Normal category
        if (
          menuData?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          return (
            menuData.itemCards?.map((item) => ({
              category: menuData.title,
              ...item.card.info,
            })) || []
          );
        }

        // Nested category
        if (
          menuData?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        ) {
          return (
            menuData.categories?.flatMap(
              (category) =>
                category.itemCards?.map((item) => ({
                  category: `${menuData.title} / ${category.title}`,
                  ...item.card.info,
                })) || [],
            ) || []
          );
        }
        return [];
      });

      // console.log(extractedMenuItems);
      setMenuItems(extractedMenuItems);
    } catch (error) {
      console.log("Error fetching Menu: ", error.message);
    }
  }

  // group the items based on their category
  const groupedMenuItems = menuItems.reduce((acc, curItem) => {
    if (!acc[curItem.category]) {
      acc[curItem.category] = [];
    }
    acc[curItem.category].push(curItem);

    return acc;
  }, {});
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Restaurant Banner */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 text-white px-6 py-8 sm:px-8">
            {/* Upper part banner */}
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between ">
              {/* Restaurant Details */}
              <div>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {restaurantInfo.name || "Restaurant"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
                  {restaurantInfo.cuisines?.join(", ") ||
                    "Delicious food and beverages"}
                </p>
              </div>
              {/* Restaurant stats */}
              <div className="grid grid-cols-3 gap-3 text-center sm:min-w-80">
                <div className="bg-white/15 rounded-xl px-3 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Rating</p>
                  <p className="mt-1 text-lg font-bold">
                    {restaurantInfo.avgRating || "N/A"}
                  </p>
                </div>
                <div className="bg-white/15 rounded-xl px-3 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Area</p>
                  <p className="mt-1 text-lg font-bold">
                    {restaurantInfo.areaName || "N/A"}
                  </p>
                </div>
                <div className="bg-white/15 rounded-xl px-3 py-3 backdrop-blur">
                  <p className="text-xs font-medium text-emerald-50">Items</p>
                  <p className="mt-1 text-lg font-bold">{menuItems.length}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom part banner */}
          <div className="gap-3 flex flex-wrap items-center border-t border-slate-100 px-6 py-4 text-sm text-slate-600 sm:px-8">
            {/* cusines */}
            {restaurantInfo.cuisines?.map((cuisine) => {
              return (
                <span
                  key={cuisine}
                  className="rounded-full px-3 py-1 font-semibold text-emerald-700 bg-emerald-50"
                >
                  {cuisine}
                </span>
              );
            })}

            {/* cost */}
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
          <div className="flex flex-col gap-3 mb-6 sm:items-end sm:justify-between sm:flex-row">
            <div>
              <p className="tracking-[0.18em] text-sm font-semibold uppercase text-emerald-700">
                Order online
              </p>
              <p className="mt-1 text-2xl font-extrabold text-slate-950">
                Complete Menu
              </p>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {Object.keys(groupedMenuItems).length} categories available
            </p>
          </div>
          {/* Categories */}
          <div>
            {Object.entries(groupedMenuItems).map(
              ([categoryName, curCategoryItems]) => {
                // console.log(categoryName);
                // console.log(curCategoryItems);
                return (
                  <MenuCategory
                    key={categoryName}
                    categoryName={categoryName}
                    curCategoryItems={curCategoryItems}
                  />
                );
              },
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default RestaurantMenu;
