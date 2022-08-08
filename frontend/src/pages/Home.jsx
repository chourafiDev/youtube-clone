import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getVideos } from "../redux/features/videos/videoSlice";
import { toast } from "react-toastify";
import VerticalCard from "../components/Card/VerticalCard";

const Home = ({ type }) => {
  const dispatch = useDispatch();
  const { videos, isError, messageError } = useSelector((state) => state.video);

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    dispatch(getVideos(type));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, messageError, type]);

  return (
    <Container>
      {videos &&
        videos.map((video) => <VerticalCard key={video._id} video={video} />)}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
  row-gap: 30px;
  gap: 1rem;
  color: ${({ theme }) => theme.text};
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 375px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default React.memo(Home);
