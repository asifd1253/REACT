import React from "react";
import { IMAGE_CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, sla, costForTwo } =
    resData?.info;
  return (
    <div className="active:scale-98 m-4 w-62 border p-3 border-gray-200 rounded-xl bg-white cursor-pointer shadow-md">
      <img
        src={IMAGE_CDN_URL + cloudinaryImageId}
        alt="Foods"
        className="w-full h-40 rounded-lg object-cover"
      />
      <div className="mt-3 px-1">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <h4 className="mt-1 text-sm text-gray-600 truncate">
          {cuisines.join(", ")}
        </h4>
        <div className="mt-3 text-sm font-semibold text-gray-700 flex items-center">
          <span className="px-1.5 py-1 bg-green-600 text-white rounded-md">
            ★ {avgRating}
          </span>
          <span className="pl-2 pr-1 text-xl">•</span>
          <span>{sla.deliveryTime} mins</span>
        </div>
        <p className="mt-2 text-sm font-medium text-gray-600">{costForTwo}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
