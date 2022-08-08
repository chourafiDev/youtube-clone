import styled from "styled-components";
import Logo from "./Logo";
import MenuItems from "./MenuItems";

const Index = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Logo />
          <MenuItems />
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 17%;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
  position: fixed;

  @media (max-width: 768px) {
    width: 8%;
  }

  @media (max-width: 425px) {
    width: 0%;
  }
`;

const Wrapper = styled.div``;

export default Index;
