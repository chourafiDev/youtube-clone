import React, { useEffect, useState, useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../redux/features/videos/videoSlice";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import styled from "styled-components";
import { toast } from "react-toastify";
import app from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Upload = ({ open, setOpen }) => {
  const containerRef = useRef();
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [videoPer, setVideoPer] = useState(0);
  const [imgPer, setImgPer] = useState(0);
  const [imgUrlPrev, setImgUrlPrev] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { videos, messageSuccess, isError, messageError, isSuccess, isAdded } =
    useSelector((state) => state.video);

  useEffect(() => {
    if (isError) {
      toast.error(messageError);
    }

    if (isSuccess && messageSuccess) {
      toast.success(messageSuccess);
    }
  }, [messageSuccess, isError, messageError, isSuccess]);

  useEffect(() => {
    if (isAdded) {
      setOpen(false);
      navigate(`video/${videos[videos.length - 1]._id}`);
    }
  }, [isAdded, videos, navigate]);

  const handleTags = () => {
    const tagItem = tag.split(" ")[0];
    setTags((prev) => [...prev, tagItem]);
    setTag("");
  };

  const handleChangeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImgUrl(e.target.files[0]);
    } else if (e.target.name === "video") {
      setVideoUrl(e.target.files[0]);
    }
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPer(Math.round(progress))
          : setVideoPer(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            console.log("running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    imgUrl && uploadFile(imgUrl, "imgUrl");
  }, [imgUrl]);

  useEffect(() => {
    videoUrl && uploadFile(videoUrl, "videoUrl");
  }, [videoUrl]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(!open);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, setOpen, open]);

  const handleUpload = (e) => {
    e.preventDefault();
    const videoData = {
      ...inputs,
      tags,
    };

    console.log(videoData);

    dispatch(uploadVideo(videoData));
  };

  return (
    <Container ref={containerRef}>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new video</Title>
        <Sides>
          <ItemSide>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChangeInputs}
            />
            <Label>Description</Label>
            <TextArea
              rows="8"
              name="desc"
              placeholder="Description"
              onChange={handleChangeInputs}
            />

            <Label>Tags</Label>
            <WrapperTags>
              <Input
                type="text"
                placeholder="Tags"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <Button onClick={handleTags}>Add</Button>
            </WrapperTags>
            {tags.length >= 1 && (
              <TagsList>
                {tags && tags.map((tag) => <TagItem key={tag}>{tag}</TagItem>)}
              </TagsList>
            )}
          </ItemSide>
          <ItemSide>
            <Label>Video</Label>
            {videoPer > 0 ? (
              <>
                <p
                  style={{
                    color: "#1ADD72",
                  }}
                >
                  Uploading: {videoPer}%
                </p>
                <div
                  style={{
                    backgroundColor: "#DBF4E6",
                    width: "120px",
                    height: "5px",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1ADD72",
                      width: `${videoPer}%`,
                      height: "5px",
                      borderRadius: "20px",
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <InputFile
                  id="file-input"
                  type="file"
                  accept="video/*"
                  name="video"
                  onChange={handleChange}
                />
                <LabelFile htmlFor="file-input">
                  <FileUploadOutlinedIcon />
                  <span>Click to upload video</span>
                </LabelFile>
              </>
            )}

            <Label>Thumbnail</Label>
            {imgPer > 0 ? (
              <>
                <p
                  style={{
                    color: "#1ADD72",
                  }}
                >
                  Uploading: {imgPer}%
                </p>
                <div
                  style={{
                    backgroundColor: "#DBF4E6",
                    width: "120px",
                    height: "5px",
                    borderRadius: "20px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1ADD72",
                      width: `${imgPer}%`,
                      height: "5px",
                      borderRadius: "20px",
                    }}
                  ></div>
                </div>
              </>
            ) : (
              <>
                <InputFile
                  id="file-input"
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
                <LabelFile htmlFor="file-input">
                  <FileUploadOutlinedIcon />
                  <span>Click to upload thumbnail</span>
                </LabelFile>
              </>
            )}
            {imgUrlPrev && <Thumbnail src={imgUrlPrev} />}
          </ItemSide>
        </Sides>

        <Button
          style={{ position: "absolute", bottom: "20px" }}
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000000a7;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 1000px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  z-index: 100;
`;

const Sides = styled.div`
  display: flex;
  gap: 20px;
  margin: 2rem 0;
`;

const ItemSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 24px;
`;
const Label = styled.p`
  font-size: 14px;
`;
const WrapperTags = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  width: 100%;
`;

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 3rem;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const TagsList = styled.div`
  display: flex;
  gap: 5px;
  margin-top: -10px;
`;

const TagItem = styled.span`
  font-size: 14px;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  padding: 4px 8px;
  border-radius: 2px;
`;

const Thumbnail = styled.img`
  width: 70%;
`;

const LabelFile = styled.label`
  cursor: pointer;
  display: flex;
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

export default Upload;
