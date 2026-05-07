const BASE_URL = "http://localhost:5233/api";

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      email: email, 
      passwordHash: password 
    })
  });

  if (!res.ok) {
    throw new Error("Login failed Try again.");
  }

  const data = await res.json();
  return data;
};

export const registerUser = async (payload) => {
  const res = await fetch(`${BASE_URL}/Auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error("Registiration failed.");
  }

  const data = await res.text();
  return data;
};

export const fetchRestaurants = async () => {
  const API_KEY = "YOUR_GOOGLE_API_KEY";
  const res = await fetch(
    `https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.0082,28.9784&radius=2000&type=restaurant&key=${API_KEY}`
  );

  const data = await res.json();
  return data.results || [];
};