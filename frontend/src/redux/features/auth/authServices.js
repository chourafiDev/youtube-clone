import axios from "axios";

const API_URL = "https://videotub101.herokuapp.com/api/auth";

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data.userData) {
    localStorage.setItem("user", JSON.stringify(response.data.userData));
  }

  return response.data;
};

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  if (response.data.userData) {
    localStorage.setItem("user", JSON.stringify(response.data.userData));
  }

  return response.data;
};

//Logout
const logout = async () => {
  localStorage.removeItem("user");
};

const authServices = { register, login, logout };

export default authServices;
