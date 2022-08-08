import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Comment from "./Comment";
import {
  addComment,
  getComments,
} from "../../redux/features/comment/commentSlice";
import { toast } from "react-toastify";
import { getUser } from "../../redux/features/user/userSlice";
import profileDefault from ".././../assets/images/default_profile.png";
import { Link } from "react-router-dom";

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const [displayButton, setDisplayButton] = useState(false);
  const [desc, setDesc] = useState("");

  const onFocus = () => setDisplayButton(true);

  const { user: currentUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { comments, isError, messageError, isAdded, messageSuccess } =
    useSelector((state) => state.comment);

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }
    if (videoId) {
      dispatch(getComments(videoId));
    }
    if (currentUser) {
      dispatch(getUser(currentUser.id));
    }
  }, [dispatch, isError, messageError, videoId, currentUser]);

  useEffect(() => {
    if (isAdded) {
      toast.success(messageSuccess);
      setDesc("");
      dispatch(getComments(videoId));
    }
  }, [isAdded, messageSuccess]);

  const handleAddComment = () => {
    const commentInfo = {
      desc,
      videoId,
    };

    dispatch(addComment(commentInfo));
  };

  return (
    <Container>
      <TotalComments>
        {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
      </TotalComments>
      {currentUser ? (
        <>
          <NewComment>
            <Avatar
              src={
                user.img && user.img.url !== null
                  ? user.img.url
                  : profileDefault
              }
            />
            <Input
              placeholder="Add a comment..."
              onChange={(e) => setDesc(e.target.value)}
              onFocus={onFocus}
              value={desc}
            />
          </NewComment>
          {displayButton && (
            <div
              style={{ display: "flex", justifyContent: "end", gap: "10px" }}
            >
              <ButtonAdd onClick={() => setDisplayButton(false)}>
                Cancel
              </ButtonAdd>
              <ButtonAdd onClick={handleAddComment}>Add</ButtonAdd>
            </div>
          )}
        </>
      ) : (
        <LoginRequire>
          Login to add comment{" "}
          <Link to="/signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link>
        </LoginRequire>
      )}

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

const Container = styled.div``;

const LoginRequire = styled.p`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
  display: flex;
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
`;

const ButtonAdd = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 4rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  margin-top: 10px;
`;

const TotalComments = styled.p`
  color: ${({ theme }) => theme.text};
  padding: 20px 0;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

export default Comments;
