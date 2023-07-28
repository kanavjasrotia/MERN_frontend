import jwt_decode from "jwt-decode";

// Function to get the token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

// Function to decode the token data
export const decodeToken = () => {
  const token = getTokenFromLocalStorage();

  try {
    if (token) {
      const decoded = jwt_decode(token);
      return decoded;
    } else {
      // Token not found in localStorage
      return null;
    }
  } catch (error) {
    // Error occurred while decoding the token
    console.error("Error decoding token:", error);
    return null;
  }
};
