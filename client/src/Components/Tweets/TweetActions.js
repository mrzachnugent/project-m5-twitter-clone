import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";

const handleOnClick = (e) => e.stopPropagation();
const handleOnKey = (e) => e.stopPropagation();

const TweetActions = (isLiked, isRetweeted, numLikes, numRetweets, tweetId) => {
  const [isTweetLiked, setIsTweetLiked] = useState(isLiked.isLiked);
  const [tweetNumLikes, setTweetNumLikes] = useState(isLiked.numLikes);
  console.log(isLiked);

  const handleClickLike = (e) => {
    if (isTweetLiked) {
      document.getElementById("like-button").blur();
    }
    console.log(!isLiked.isLiked);
    e.stopPropagation();
    fetch(`/api/tweet/${isLiked.tweetId}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ like: !isTweetLiked }),
    })
      .then((res) => res.json())
      .then((message) => console.log(message))
      .then(() => {
        if (!isTweetLiked) {
          setTweetNumLikes(tweetNumLikes + 1);
        } else {
          setTweetNumLikes(tweetNumLikes - 1);
        }
      })
      .then(() => setIsTweetLiked(!isTweetLiked));
  };

  const handleKeyLike = (e) => e.stopPropagation();

  return (
    <Wrapper>
      <IconAndNum>
        <ReplyButton onClick={handleOnClick} onKeyPress={handleOnKey}>
          <FiMessageCircle />
        </ReplyButton>
        <span></span>
      </IconAndNum>
      <IconAndNum>
        <RetweetButton
          isRetweeted={isLiked.isRetweeted}
          onClick={handleOnClick}
          onKeyPress={handleOnKey}
        >
          <FiRepeat />
        </RetweetButton>
        {isLiked.numRetweets > 0 && <span>{isLiked.numRetweets}</span>}
      </IconAndNum>
      <IconAndNum>
        <LikeButton
          isLiked={isTweetLiked}
          onClick={handleClickLike}
          onKeyPress={handleOnKey}
          id="like-button"
        >
          <FiHeart />
        </LikeButton>
        {tweetNumLikes > 0 && <span>{tweetNumLikes}</span>}
      </IconAndNum>
      <IconAndNum>
        <ShareButton onClick={handleOnClick} onKeyPress={handleOnKey}>
          <FiShare />
        </ShareButton>
        <span></span>
      </IconAndNum>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 100;
  padding: 10px 0;
`;

const IconButton = styled.button`
  border: none;
  color: #666;
  font-size: 21px;
  padding: 9px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  transition: all 0.15s ease-in-out;

  &:focus {
    outline: none;
  }
`;

const ReplyButton = styled(IconButton)`
  &:hover {
    color: rgb(27, 149, 224);
    background: rgba(27, 148, 224, 0.05);
  }
  &:focus {
    background: rgba(27, 148, 224, 0.05);
    color: rgb(27, 149, 224);
  }
`;
const RetweetButton = styled(IconButton)`
  color: ${(props) => (props.isRetweeted ? "rgb(23, 191, 99)" : "#666")};
  &:hover {
    color: rgb(23, 191, 99);
    background: rgba(23, 191, 99, 0.05);
  }
  &:focus {
    background: rgba(23, 191, 99, 0.05);
    color: rgb(23, 191, 99);
  }
`;
const LikeButton = styled(IconButton)`
  color: ${(props) => (props.isLiked ? "rgb(224, 36, 94)" : "#666")};

  &:hover {
    color: rgb(224, 36, 94);
    background: rgba(224, 36, 94, 0.05);
  }
  &:focus {
    background: rgba(224, 36, 94, 0.05);
    color: rgb(224, 36, 94);
  }
`;
const ShareButton = styled(IconButton)`
  &:hover {
    color: rgb(27, 149, 224);
    background: rgba(27, 149, 224, 0.05);
  }
  &:focus {
    color: rgb(27, 149, 224);
    background: rgba(27, 149, 224, 0.05);
  }
`;

const IconAndNum = styled.div`
  display: flex;
  align-items: center;
  width: 75px;

  span {
    font-weight: 700;
  }
`;

export default TweetActions;
