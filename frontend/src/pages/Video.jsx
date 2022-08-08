import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { reset, getVideo } from "../redux/features/videos/videoSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import moment from "moment";
import profileDefault from "../assets/images/default_profile.png";
import {
  likeVideo,
  dislikeVideo,
  addViews,
} from "../redux/features/videos/videoSlice";
import {
  getUser,
  subChannel,
  unSubChannel,
} from "../redux/features/user/userSlice";
import Comments from "../components/Comments";
import Recommendations from "../components/Recommendations";

const Video = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const videoId = params.id;

  const { video, isError, messageError } = useSelector((state) => state.video);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { user, isSub, isUnsub } = useSelector((state) => state.user);

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    dispatch(getVideo(videoId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, messageError, videoId]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUser(currentUser.id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (isSub || isUnsub) {
      dispatch(getVideo(videoId));
    }
  }, [dispatch, isSub, isUnsub]);

  useEffect(() => {
    if (videoId) {
      dispatch(addViews(videoId));
    }
  }, [dispatch, videoId]);

  const hundleLike = () => {
    dispatch(likeVideo(videoId));
  };

  const hundleDislike = () => {
    dispatch(dislikeVideo(videoId));
  };

  const handelLikeRequireLogin = (type) => {
    toast.warning(`Login to ${type} this video`);
  };

  const hundleSub = (channelId) => {
    if (currentUser) {
      if (user.subscribedUsers.includes(channelId)) {
        dispatch(unSubChannel(channelId));
      } else {
        dispatch(subChannel(channelId));
      }
    } else {
      toast.warning("Login to subscribe this channel");
    }
  };

  return (
    <Container>
      <Content>
        <VideoFrame controls src={video.videoUrl} />

        <Title>{video.title}</Title>
        <Details>
          <Info>
            {video.views && video.views.toLocaleString("en-US")} views •{" "}
            {moment(video.createdAt).fromNow()}
          </Info>
          <Buttons>
            <Button>
              {currentUser ? (
                <Button onClick={() => hundleLike()}>
                  {video.likes?.includes(user._id) ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                  {video.likes?.length}
                </Button>
              ) : (
                <Button onClick={() => handelLikeRequireLogin("like")}>
                  <ThumbUpOutlinedIcon />
                  {video.likes?.length}
                </Button>
              )}
            </Button>
            {currentUser ? (
              <Button onClick={hundleDislike}>
                {video.dislikes?.includes(user._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}
                Dislike
              </Button>
            ) : (
              <Button onClick={() => handelLikeRequireLogin("dislike")}>
                <ThumbUpOutlinedIcon />
                Dislike
              </Button>
            )}
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          {video.userId && (
            <ChannelInfo>
              <Image
                src={video.userId ? video.userId.img.url : profileDefault}
              />
              <ChannelDetail>
                <ChannelName>{video.userId.name}</ChannelName>
                <ChannelCounter>
                  {video.userId &&
                    video.userId.subscribers.toLocaleString("en-US")}{" "}
                  subscribers
                </ChannelCounter>
                <Description>{video.desc}</Description>
              </ChannelDetail>
            </ChannelInfo>
          )}

          {user ? (
            video.userId && user.subscribedUsers?.includes(video.userId._id) ? (
              <Subscribed onClick={() => hundleSub(video.userId._id)}>
                SUBSCRIBED
              </Subscribed>
            ) : (
              <Subscribe onClick={() => hundleSub(video.userId._id)}>
                SUBSCRIBE
              </Subscribe>
            )
          ) : (
            <Subscribe>SUBSCRIBE</Subscribe>
          )}
        </Channel>
        <Hr />
        <Comments videoId={video._id} />
      </Content>
      <Recommendations videoId={video._id} tags={video.tags} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }
`;

const Content = styled.div``;

const VideoFrame = styled.video`
  height: 400px;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const Subscribed = styled.button`
  background-color: #8a8a8a;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

export default Video;
