import styled from "styled-components";
import logo from "../../assets/images/logo.svg";

const Logo = () => {
  return (
    <Conatiner>
      <LogoArea src={logo} />
    </Conatiner>
  );
};

const Conatiner = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 20px;

  @media (max-width: 425px) {
    display: none;
  }
`;

const LogoArea = styled.img`
  width: 20%;

  @media (max-width: 768px) {
    width: 250%;
  }
`;

export default Logo;
