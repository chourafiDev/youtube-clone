import styled from "styled-components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, searchVideo } from "../redux/features/videos/videoSlice";
import { toast } from "react-toastify";
import VerticalCard from "../components/Card/VerticalCard";
import { useLocation } from "react-router-dom";

const Search = () => {
  const query = useLocation().search;
  const dispatch = useDispatch();
  const { videos, isError, messageError } = useSelector((state) => state.video);

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    dispatch(searchVideo(query));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, messageError, query]);

  return (
    <Container>
      {videos &&
        videos.map((video) => <VerticalCard key={video.id} video={video} />)}
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
`;

export default Search;
