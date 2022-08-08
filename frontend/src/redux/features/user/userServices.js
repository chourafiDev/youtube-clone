import axios from "axios";

const API_URL = "https://videotub101.herokuapp.com/api/users";

const getUser = async (id) => {
  const response = await axios.get(`${API_URL}/find/${id}`);

  return response.data;
};

const subChannel = async (channelId, token) => {
  const response = await axios.put(`${API_URL}/sub/${channelId}`, token, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const unSubChannel = async (channelId, token) => {
  const response = await axios.put(`${API_URL}/unsub/${channelId}`, token, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const userServices = { getUser, subChannel, unSubChannel };

export default userServices;
