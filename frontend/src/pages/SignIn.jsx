import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/images/default_profile.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [nameRegsiter, setNameRegister] = useState("");
  const [passwordRegsiter, setPasswordRegsiter] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imgUrlPrev, setImgUrlPrev] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "imgUrl") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgUrl(reader.result);
          setImgUrlPrev(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const dispatch = useDispatch();
  const { isError, messageError } = useSelector((state) => state.auth);

  const hendelLogin = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const hendelRegister = (e) => {
    e.preventDefault();

    const userData = {
      name: nameRegsiter,
      email: emailRegister,
      password: passwordRegsiter,
      imgUrl,
    };

    dispatch(register(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }
  }, [dispatch, isError, messageError]);

  return (
    <Container>
      <FomWrapper>
        <Wrapper>
          <Title>Sign in</Title>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            type="email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <Button onClick={hendelLogin}>Sign in</Button>
          <Title>or</Title>
          <Hr />

          <ProfileImg>
            <ImgDispaly src={imgUrlPrev ? imgUrlPrev : defaultProfile} />
            <InputFile
              type="file"
              name="imgUrl"
              id="file-input"
              onChange={handleChange}
            />
            <Label htmlFor="file-input">
              <span>Upload photo</span>
            </Label>
          </ProfileImg>

          <Input
            onChange={(e) => setNameRegister(e.target.value)}
            placeholder="username"
            type="text"
          />
          <Input
            onChange={(e) => setEmailRegister(e.target.value)}
            placeholder="email"
            type="email"
          />
          <Input
            onChange={(e) => setPasswordRegsiter(e.target.value)}
            type="password"
            placeholder="password"
          />
          <Button onClick={hendelRegister}>Sign up</Button>
        </Wrapper>
        <More>
          English(USA)
          <Links>
            <Link>Help</Link>
            <Link>Privacy</Link>
            <Link>Terms</Link>
          </Links>
        </More>
      </FomWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  padding-top: 15px;
`;

const FomWrapper = styled.div`
  width: 350px;
`;

const Hr = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.soft};
  margin: 10px 0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 30px;
  gap: 10px;
`;

const ProfileImg = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ImgDispaly = styled.img`
  border-radius: 50%;
  cursor: pointer;
  width: 55px;
  height: 55px;
`;

const Label = styled.label`
  cursor: pointer;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.soft};
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`;

const InputFile = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

export default SignIn;
