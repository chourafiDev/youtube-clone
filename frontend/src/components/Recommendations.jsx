import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import HorizontalCard from "../components/Card/HorizontalCard";
import { recommendationVideos } from "../redux/features/videos/videoSlice";

const Recommendation = styled.div`
  flex: 3;
`;

const Recommendations = ({ videoId, tags }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { recommends, isError, isSuccess, messageError } = useSelector(
    (state) => state.video
  );

  const recommendsList = recommends.filter((rec) => rec._id !== videoId);

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    dispatch(recommendationVideos(tags));
  }, [dispatch, isError, messageError, tags]);

  return (
    <Recommendation>
      <RecTitle>Recommendations</RecTitle>
      {recommendsList &&
        recommendsList.map((rec) => <HorizontalCard key={rec._id} rec={rec} />)}
    </Recommendation>
  );
};

const RecTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

export default Recommendations;
