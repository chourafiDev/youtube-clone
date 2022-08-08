import moment from "moment";
import React from "react";
import styled from "styled-components";
import profileDefault from "../../assets/images/default_profile.png";

const Comment = ({ comment }) => {
  return (
    <Container>
      <Avatar
        src={
          comment.userId.img && comment.userId.img.url !== null
            ? comment.userId.img.url
            : profileDefault
        }
      />
      <Details>
        <Name>
          {comment.userId && comment.userId.name}
          <Date>{moment(comment.createdAt).fromNow()}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 30px 0;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

export default Comment;
