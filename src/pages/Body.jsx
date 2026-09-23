import RestaurantCard from "../components/RestaurantCard";
import { useState, useEffect } from "react";
import BodyShimmer from "../components/BodyShimmer";
import useRestaurants from "../hooks/useRestaurants";
import useOnlineStatus from "../hooks/useOnlineStatus";
import OfflineStatus from "../components/OfflineStatus";

const Body = () => {
  const { restaurantList } = useRestaurants();
  // console.log(restaurantList);

  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const curStatus = useOnlineStatus();

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

  if (curStatus === false) {
    return <OfflineStatus />;
  }
  return restaurantList.length === 0 ? (
    <div className="flex flex-wrap justify-center">
      {Array.from({ length: 12 }, (_, index) => (
        <BodyShimmer key={index} />
      ))}
    </div>
  ) : (
    <div>
      <div className="m-6 flex items-center justify-center gap-3">
        <input
          type="text"
          className="h-10 w-full max-w-2xl rounded-lg border border-gray-300 px-3 text-base font-medium outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 active:scale-95"
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
