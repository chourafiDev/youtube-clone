import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";

const HorizontalCard = ({ rec }) => {
  return (
    <Link to={`/video/${rec._id}`} style={{ textDecoration: "none" }}>
      <Container>
        <Image src={rec.imgUrl} alt={rec.title} />
        <Details>
          <Texts>
            <Title>{rec.title.substring(1, 50)}...</Title>
            <ChannelName>{rec.userId && rec.userId.name}</ChannelName>
            <Info>
              {rec.views} views • {moment(rec.createdAt).fromNow()}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 8px;
`;

const Image = styled.img`
  background-color: #999;
  width: 45%;
  height: 100%;
`;

const Details = styled.div`
  /* flex: 2; */
  padding: 5px;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export default HorizontalCard;
