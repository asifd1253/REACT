import RestaurantCard from "./RestaurantCard";
// import { RESTAURANT_LIST } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { SWIGGY_URL } from "../utils/constants";

const Body = () => {
  // const [resList, setResList] = useState(RESTAURANT_LIST);
  const [restaurantList, setRestaurantList] = useState([]);

  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [ratingInput, setRatingInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(SWIGGY_URL);
    const jsObj = await data.json();
    // console.log(jsObj);
    const restaurants =
      jsObj?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    console.log(restaurants);

    setRestaurantList(restaurants);
    setFilteredRestaurantList(restaurants);
  }

  // const handleSearch = () => {
  //   const filteredList = restaurantList.filter((restaurant) => {
  //     return restaurant.info.avgRating > Number(ratingInput);
  //   });
  //   setFilteredRestaurantList(filteredList);
  // };

  return restaurantList.length === 0 ? (
    <div className="flex flex-wrap justify-center">
      {Array.from({ length: 12 }, (_, index) => (
        <Shimmer key={index} />
      ))}
    </div>
  ) : (
    <div>
      <div className="m-6 flex items-center justify-center gap-3">
        <input
          type="text"
          className="active:scale-97 h-10 w-full max-w-2xl rounded-lg border border-gray-300 px-3 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Search for restaurants or cuisines..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const searchTextLower = searchText.toLowerCase();
            const filteredList = restaurantList.filter((restaurant) => {
              if (
                restaurant.info.name.toLowerCase().includes(searchTextLower) ||
                restaurant.info.cuisines
                  .join(", ")
                  .toLowerCase()
                  .includes(searchTextLower)
              ) {
                return true;
              }
            });
            setFilteredRestaurantList(filteredList);
          }}
          className="h-10 border w-auto px-4 rounded-lg bg-blue-500 text-xl font-semibold text-white shadow-sm transition hover:bg-blue-600 active:scale-95"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurantList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;
