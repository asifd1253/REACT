import RestaurantCard from "./RestaurantCard";
// import { RESTAURANT_LIST } from "../utils/mockData";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  // const [resList, setResList] = useState(RESTAURANT_LIST);
  const [resList, setResList] = useState([]);
  const [ratingInput, setRatingInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89975149558154&lng=77.63580048464019&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    );
    const jsObj = await data.json();
    // console.log(jsObj);
    setResList(
      jsObj?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
  }

  const handleSearch = () => {
    // const filterdResList = RESTAURANT_LIST.filter(
    const filterdResList = resList.filter((restaurant) => {
      return restaurant.info.avgRating > Number(ratingInput);
    });
    setResList(filterdResList);
  };
  if (resList.length === 0) {
    return (
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: 12 }, (_, index) => (
          <Shimmer key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex m-4 items-center gap-2">
        <input
          type="text"
          className="border w-2xl rounded-md p-2 font-semibold"
          placeholder="Search for restaurants using rating..."
          value={ratingInput}
          onChange={(e) => {
            setRatingInput(e.target.value);
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-xl cursor-pointer bold border-amber-50 rounded-md w-24 p-1.5 font-normal"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {resList.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};
export default Body;
