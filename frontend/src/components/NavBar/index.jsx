import styled from "styled-components";
import NavMenu from "./NavMenu";
import Search from "./Search";

const Index = ({ darkMode, setDarkMode }) => {
  return (
    <Container>
      <Wrapper>
        <Search />
        <NavMenu darkMode={darkMode} setDarkMode={setDarkMode} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: end;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1rem;
    justify-content: center;
  }
`;

export default Index;
