import axios from "axios";

const API_URL = "https://videotub101.herokuapp.com/api/comments";

const getComments = async (videoId) => {
  const response = await axios.get(`${API_URL}/${videoId}`);

  return response.data;
};

const addComment = async (commentInfo, token) => {
  const { desc, videoId } = commentInfo;

  const response = await axios.post(
    `${API_URL}/add-comment/${videoId}`,
    { desc },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const commentServices = { getComments, addComment };

export default commentServices;
