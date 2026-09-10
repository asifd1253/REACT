import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { CORS_PROXY_URL, SWIGGY_URL } from "../utils/constants";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [ratingInput, setRatingInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // const response = await fetch(CORS_PROXY_URL);
      const response = await fetch(SWIGGY_URL);
      const jsObj = await response.json();
      // console.log(jsObj);

      const cards = jsObj?.data?.cards || [];
      const restaurantCard = cards.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );
      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];
      // console.log("Restaurant Card:", restaurantCard);
      // console.log("Restaurants:", restaurants);

      setRestaurantList(restaurants);
      setFilteredRestaurantList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
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
  }, [searchText, restaurantList]);

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
          className="active:scale-95 h-10 w-full max-w-2xl rounded-lg border border-gray-300 px-3 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Search for restaurants or cuisines..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
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
