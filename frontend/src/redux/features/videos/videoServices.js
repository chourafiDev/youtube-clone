import axios from "axios";

const API_URL = "https://videotub101.herokuapp.com/api";

const getVideos = async (type, token) => {
  let response;

  if (type === "sub" && token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    response = await axios.get(`${API_URL}/videos/${type}`, config);
  } else {
    response = await axios.get(`${API_URL}/videos/${type}`);
  }

  return response.data;
};

const getVideo = async (id) => {
  const response = await axios.get(`${API_URL}/videos/find/${id}`);

  return response.data;
};

const addViews = async (id) => {
  const response = await axios.put(`${API_URL}/videos/view/${id}`);

  return response.data;
};

const uploadVideo = async (videoData, token) => {
  const response = await axios.post(`${API_URL}/videos`, videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const searchVideo = async (query) => {
  const response = await axios.get(`${API_URL}/videos/search${query}`);

  return response.data;
};

const recommendationVideos = async (tags) => {
  const response = await axios.get(`${API_URL}/videos/tags?tags=${tags}`);

  return response.data;
};

const likeVideo = async (videoId, token) => {
  const response = await axios.put(`${API_URL}/users/like/${videoId}`, token, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const dislikeVideo = async (videoId, token) => {
  const response = await axios.put(
    `${API_URL}/users/unlike/${videoId}`,
    token,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const videoServices = {
  getVideos,
  getVideo,
  likeVideo,
  dislikeVideo,
  uploadVideo,
  recommendationVideos,
  searchVideo,
  addViews,
};

export default videoServices;
