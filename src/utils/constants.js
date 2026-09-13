export const LOGO = new URL("../assets/logo.png", import.meta.url).href;

export const IMAGE_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export const SWIGGY_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.89975149558154&lng=77.63580048464019&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const CORS_PROXY_URL = `https://corsproxy.io/?key=da3f76f8&url=${encodeURIComponent(SWIGGY_URL)}`;

export const MENU_API_URL =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.89975149558154&lng=77.63580048464019&restaurantId=518778&catalog_qa=undefined&submitAction=ENTER";

export const RESTAURANTS_API =
  "https://raw.githubusercontent.com/asifd1253/food-world-api/main/restaurants/restaurants.json";

export const MENU_API =
  "https://raw.githubusercontent.com/asifd1253/food-world-api/main/menu";