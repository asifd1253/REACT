import RestaurantCard from "./RestaurantCard";
import { RESTAURANT_LIST } from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [resList, setResList] = useState(RESTAURANT_LIST);
  return (
    <div className="">
      <div className="flex m-4 items-center gap-2">
        <input
          type="text"
          className="border w-2xl rounded-md p-2 font-semibold"
          placeholder="Search for restaurants..."
        />
        <button
          onClick={() => {
            const filterdResList = resList.filter(
              (restaurant) => restaurant.info.avgRating > 4.3,
            );
            setResList(filterdResList);
          }}
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
