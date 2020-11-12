import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { ScaleIn } from "./ScaleIn";

//I forgot to deconstruct the props
const TweetActions = (isLiked, isRetweeted, numLikes, numRetweets, tweetId) => {
  const [isTweetLiked, setIsTweetLiked] = useState(isLiked.isLiked);
  const [tweetNumLikes, setTweetNumLikes] = useState(isLiked.numLikes);
  const [isTweetRetweeted, setIsTweetRetweeted] = useState(isLiked.isRetweeted);
  const [tweetNumRetweets, setTweetNumRetweets] = useState(isLiked.numRetweets);
  console.log(isLiked);
  const { setIsModalOpen } = isLiked;

  const handleOnClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleOnKey = (e) => e.stopPropagation();

  const handleClickLike = (e) => {
    if (isTweetLiked) {
      document.getElementById("like-button").blur();
    }
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

  // const handleClickRetweet = (e) => {
  //   if (isTweetRetweeted) {
  //     document.getElementById("retweet-button").blur();
  //   }
  //   e.stopPropagation();
  //   fetch(`/api/tweet/${isLiked.tweetId}/retweet`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({ retweet: !isTweetRetweeted }),
  //   })
  //     .then((res) => res.json())
  //     .then((message) => console.log(message))
  //     .then(() => {
  //       if (!isTweetRetweeted) {
  //         setTweetNumRetweets(tweetNumRetweets + 1);
  //       } else {
  //         setTweetNumRetweets(tweetNumRetweets - 1);
  //       }
  //     })
  //     .then(() => setIsTweetRetweeted(!isTweetRetweeted));
  // };

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
          id="retweet-button"
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
          style={{ height: "40px" }}
        >
          {!isTweetLiked ? (
            <FiHeart />
          ) : (
            <ScaleIn>
              <FaHeart />
            </ScaleIn>
          )}
        </LikeButton>
        {tweetNumLikes > 0 && <NumStats>{tweetNumLikes}</NumStats>}
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

const NumStats = styled.span`
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    33% {
      opacity: 0;
    }

    50% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(1);
    }
  }
`;

export default TweetActions;
