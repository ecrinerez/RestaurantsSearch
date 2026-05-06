const API_KEY = "YOUR_GOOGLE_API_KEY";

export const fetchRestaurants = async () => {
  const res = await fetch(
    `https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.0082,28.9784&radius=2000&type=restaurant&key=${API_KEY}`
  );

  const data = await res.json();

  return data.results || [];
};