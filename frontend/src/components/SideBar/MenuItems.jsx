import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBaseballOutlinedIcon from "@mui/icons-material/SportsBaseballOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const MenuItems = () => {
  const { user } = useSelector((state) => state.auth);

  const [topView, setTopView] = useState(0);
  const renderView = ({ style, ...props }) => {
    const { top } = topView;
    const viewStyle = {
      backgroundColor: `rgb(${Math.round(255 - top * 255)}, ${Math.round(
        top * 255
      )}, ${Math.round(255)})`,
      color: `rgb(${Math.round(255 - top * 255)}, ${Math.round(
        255 - top * 255
      )}, ${Math.round(255 - top * 255)})`,
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  };

  const renderThumb = ({ style, ...props }) => {
    const { top } = topView;
    const thumbStyle = {
      backgroundColor: `rgb(${Math.round(255 - top * 255)}, ${Math.round(
        255 - top * 255
      )}, ${Math.round(255 - top * 255)})`,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <Scrollbars
      style={{ height: 570 }}
      renderView={renderView}
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
    >
      <Container>
        <Items>
          <NavLink to="/" style={{ color: "inherit" }}>
            <Item>
              <HomeIcon />
              Home
            </Item>
          </NavLink>
          <NavLink to="/explore" style={{ color: "inherit" }}>
            <Item>
              <ExploreOutlinedIcon />
              Explore
            </Item>
          </NavLink>
          <Item>
            <AutoGraphOutlinedIcon />
            Shorts
          </Item>
          {user && (
            <NavLink to="/subscriptions" style={{ color: "inherit" }}>
              <Item>
                <SubscriptionsOutlinedIcon />
                Subscriptions
              </Item>
            </NavLink>
          )}
        </Items>
        <Hr />
        <Items>
          <Item>
            <VideoLibraryOutlinedIcon />
            Library
          </Item>
          <Item>
            <HistoryOutlinedIcon />
            History
          </Item>
        </Items>
        {!user && (
          <>
            <Hr />

            <SignInArea>
              <Title>Sign in to like videos, comment, and subscribe.</Title>
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </SignInArea>
          </>
        )}
        <Hr />
        <Items>
          <ItemsTitle>EXPLORE</ItemsTitle>
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
          <Item>
            <SportsBaseballOutlinedIcon />
            Sports
          </Item>
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
          <Item>
            <LiveTvOutlinedIcon />
            Live
          </Item>
        </Items>
        <Hr />
        <Items>
          <Item>
            <SettingsApplicationsOutlinedIcon />
            Settings
          </Item>
          <Item>
            <ReportGmailerrorredOutlinedIcon />
            Report history
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
          <Item>
            <FeedbackOutlinedIcon />
            Send feedback
          </Item>
        </Items>
      </Container>
    </Scrollbars>
  );
};

const Container = styled.div`
  max-height: 100%;
`;
const Hr = styled.hr`
  position: relative;
  top: 20px;
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.soft};
  margin-bottom: 50px;
`;
const Items = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.5px;
`;
const SignInArea = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding: 0 20px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  cursor: pointer;
  padding: 7.5px 20px;
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const ItemsTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
  padding: 0 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h2`
  font-size: 13px;
  font-weight: 300;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export default MenuItems;
