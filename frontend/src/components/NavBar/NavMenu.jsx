import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styled from "styled-components";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import profileDefault from "../../assets/images/default_profile.png";
import { logout } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import Upload from "../../components/Upload";
import { themeDarkMode } from "../../redux/features/theme/themeSlice";

const NavMenu = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { isDarkMode } = useSelector((state) => state.theme);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleDarkMode = () => {
    dispatch(themeDarkMode());
  };

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <Container>
        {user ? (
          <Ul>
            <Li onClick={() => setOpen(true)}>
              <VideoCallOutlinedIcon />
            </Li>
            <Li>
              <GridViewOutlinedIcon />
            </Li>
            <Li>
              <NotificationsNoneOutlinedIcon />
            </Li>
            <Li>
              <Img
                src={
                  user.img && user.img.url !== null
                    ? user.img.url
                    : profileDefault
                }
                alt={user.name}
              />
            </Li>
            <Li onClick={handleLogout}>
              <LogoutOutlinedIcon />
            </Li>
            <Li>
              {isDarkMode === "dark" ? (
                <DarkIcon onClick={handleDarkMode}>
                  <BedtimeOutlinedIcon />
                </DarkIcon>
              ) : (
                <DarkIcon onClick={handleDarkMode}>
                  <LightModeOutlinedIcon />
                </DarkIcon>
              )}
            </Li>
          </Ul>
        ) : (
          <DefaultMenu>
            <Li>
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Li>
            <Li>
              {isDarkMode === "dark" ? (
                <DarkIcon onClick={handleDarkMode}>
                  <BedtimeOutlinedIcon />
                </DarkIcon>
              ) : (
                <DarkIcon onClick={handleDarkMode}>
                  <LightModeOutlinedIcon />
                </DarkIcon>
              )}
            </Li>
          </DefaultMenu>
        )}
      </Container>

      {open && <Upload open={open} setOpen={setOpen} />}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 15px;
`;

const Img = styled.img`
  width: 85%;
  border-radius: 50%;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DefaultMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 4rem;
`;

const Li = styled.li`
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DarkIcon = styled.div`
  background-color: #7e7c7c46;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 120%;
`;

export default NavMenu;
