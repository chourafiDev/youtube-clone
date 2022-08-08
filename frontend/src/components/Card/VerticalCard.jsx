import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import profileDefault from "../../assets/images/default_profile.png";

const Index = ({ video }) => {
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container>
        <Image src={video.imgUrl} />
        <Details>
          <ChannelImage
            src={video.userId.img ? video.userId.img.url : profileDefault}
            alt={video.userId.name}
          />
          <Texts>
            <Title>
              {video.title.length >= 50
                ? video.title.substring(1, 50) + "..."
                : video.title}
            </Title>
            <ChannelName>{video.userId.name}</ChannelName>
            <Info>
              {video.views} views • {moment(video.createdAt).fromNow()}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
`;

const Image = styled.img`
  width: 100%;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  padding: 5px;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin: 10px 0px 3px 0;
`;

const Info = styled.div`
  font-size: 0.8rem;
  line-height: 1.3rem;
  color: ${({ theme }) => theme.textSoft};
`;

export default Index;
