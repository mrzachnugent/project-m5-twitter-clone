import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileAvatar, StylelessLink } from "../../GlobalStyles";
import moment from "moment";
import TweetActions from "./TweetActions";
import { COLORS } from "../../constants";
import { FiRepeat } from "react-icons/fi";
import { Icon } from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { CurrentUserContext } from "../../CurrentUserContext";

const TweetOverview = ({ tweetId }) => {
  let history = useHistory();
  const { currentUser } = useContext(CurrentUserContext);
  const { handle } = currentUser;
  const [tweetDetails, setTweetDetails] = useState(null);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [mediaDetails, setMediaDetails] = useState(null);
  const [retweetDetails, setRetweetDetails] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [isLiked, setIsLiked] = useState(null);
  const [isRetweeted, setIsRetweeted] = useState(null);
  const [numRetweets, setNumRetweets] = useState(null);
  const [numLikes, setNumLikes] = useState(null);

  const handleClickToTweet = (e) => {
    e.stopPropagation();
    history.push(`/tweet/${tweetId}`);
  };

  const handleKeyToTweet = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") history.push(`/tweet/${tweetId}`);
  };

  const handleClickToProfile = (e) => {
    e.stopPropagation();
    history.push(`/${authorDetails.handle}`);
  };

  const handleKeyToProfile = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") history.push(`/${authorDetails.handle}`);
  };

  useEffect(() => {
    if (tweetId) {
      fetch(`/api/tweet/${tweetId}`)
        .then((res) => res.json())
        .then((json) => {
          setTweetDetails(json.tweet);
          setAuthorDetails(json.tweet.author);
          setMediaDetails(json.tweet.media);
          setRetweetDetails(json.tweet.retweetFrom);
          setIsLiked(json.tweet.isLiked);
          setIsRetweeted(json.tweet.isRetweeted);
          setNumLikes(json.tweet.numLikes);
          setNumRetweets(json.tweet.numRetweets);
          if (json.tweet.retweetFrom) {
            setNumRetweets(1);
            if (json.tweet.retweetFrom.handle === handle) {
              setIsRetweeted(true);
              return;
            }
          }
        })
        .then(() => setLoadingStatus("loaded"))
        // .then(() => {
        //   if (retweetDetails) {
        //     setNumRetweets(1);
        //   }
        // })
        // .then(() => {
        //   if (retweetDetails) {
        //     if (retweetDetails.handle === handle) {
        //       setIsRetweeted(true);
        //     }
        //   }
        // })
        .catch(() => setLoadingStatus("error"));
    }

    return () => setLoadingStatus("loading");
  }, []);

  return (
    <>
      {loadingStatus === "error" && (
        <ErrorText>
          <p style={{ paddingBottom: "15px" }}>
            <Icon icon={bomb} size={55} />
          </p>
          Something went wrong, this meow did not load properly.
          <p>
            Please try refreshing the page, or <a href="/">contact support</a>{" "}
            if the problem persists.
          </p>
        </ErrorText>
      )}
      {loadingStatus === "loaded" && (
        <Wrapper
          tabIndex="0"
          onClick={handleClickToTweet}
          onKeyPress={handleKeyToTweet}
          aria-label="Go to tweet details"
        >
          {retweetDetails && (
            <Retweeted>
              <FiRepeat /> <p>{retweetDetails.displayName} Remeowed</p>
            </Retweeted>
          )}
          <TweetWrapper>
            <div>
              <div
                onClick={handleClickToProfile}
                onKeyPress={handleKeyToProfile}
              >
                <ProfileAvatar
                  src={authorDetails.avatarSrc}
                  alt={`${authorDetails.handle}`}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <TweetBody>
              <div>
                <DisplayName>
                  <Name
                    onClick={handleClickToProfile}
                    onKeyPress={handleKeyToProfile}
                    tabIndex="0"
                    aria-label="Go to profile"
                  >
                    {authorDetails.displayName}
                  </Name>{" "}
                  <Handle>
                    @{authorDetails.handle}{" "}
                    <Timestamp>
                      {moment(new Date(tweetDetails.timestamp)).format(
                        "· MMM Do"
                      )}
                    </Timestamp>
                  </Handle>
                </DisplayName>
              </div>

              <TweetContent>{tweetDetails.status}</TweetContent>
              {mediaDetails &&
                mediaDetails.map((media, index) => {
                  if (media.type === "img")
                    return (
                      <TweetImg
                        src={media.url}
                        alt={`Image for ${tweetDetails.status}`}
                        key={`img-order-${index}`}
                      />
                    );
                })}
            </TweetBody>
          </TweetWrapper>
          <div style={{ padding: "0 75px" }}>
            {tweetId && (
              <TweetActions
                isLiked={isLiked}
                numLikes={numLikes}
                numRetweets={numRetweets}
                isRetweeted={isRetweeted}
                tweetId={tweetId}
              />
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

const Retweeted = styled.div`
  padding: 10px 20px;
  color: #666;
  display: flex;
  font-size: 14px;

  p {
    margin-left: 10px;
  }
`;

const Name = styled.span`
  cursor: pointer;

  &:focus {
    outline-color: ${COLORS.focused};
  }
`;

const Wrapper = styled.div`
  border-top: 1px solid #ececec;

  &:focus {
    outline-color: ${COLORS.focused};
  }
`;

const TweetBody = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const TweetWrapper = styled.div`
  padding: 17px;
  display: flex;
`;

const DisplayName = styled.p`
  font-weight: 700;
  padding-bottom: 15px;
`;

const Handle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #888;
`;

const TweetContent = styled.p`
  font-size: 18px;
  max-width: 97%;
`;

const TweetImg = styled.img`
  width: 100%;
  border-radius: 15px;
  margin: 15px 0;
`;

const Timestamp = styled.span`
  padding-bottom: 15px;
  font-size: 14px;
`;

const ErrorText = styled.div`
  text-align: center;
  padding: 50px;
  border-top: 1px solid #ececec;
`;

export default TweetOverview;
