import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  return (
    <Container>
      <Wrapper>
        <Input
          type="search"
          placeholder="Search"
          onChange={(e) => setTitle(e.target.value)}
        />
        <IconSearch onClick={() => navigate(`/search?title=${title}`)}>
          <SearchOutlinedIcon />
        </IconSearch>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: transparent;
  width: 500px;
  border: 1px solid #7e7c7c46;

  @media (max-width: 425px) {
    width: 400px;
  }
  @media (max-width: 375px) {
    width: 350px;
  }
  @media (max-width: 320px) {
    width: 300px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 100%;
  padding: 10px 5px;
`;

const IconSearch = styled.div`
  background-color: #7e7c7c46;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 10px 15px;
`;

export default Search;
