import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { PageWrapper, ProfileAvatar, StylelessLink } from "../../GlobalStyles";
import moment from "moment";
import TweetActions from "./TweetActions";
import { PageTitle } from "../PageTitle";
import { LoadingSpinnner } from "../LoadingSpinner";
import { ErrorSection } from "../ErrorSection";
import { CurrentUserContext } from "../../CurrentUserContext";

const TweetDetails = () => {
  const { tweetId } = useParams();
  let history = useHistory();
  const { currentUser } = useContext(CurrentUserContext);
  const { handle } = currentUser;
  const [tweetDetails, setTweetDetails] = useState({});
  const [authorDetails, setAuthorDetails] = useState({});
  const [mediaDetails, setMediaDetails] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [isLiked, setIsLiked] = useState(null);
  const [isRetweeted, setIsRetweeted] = useState(null);
  const [numRetweets, setNumRetweets] = useState(null);
  const [numLikes, setNumLikes] = useState(null);

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
          setIsLiked(json.tweet.isLiked);
          setIsRetweeted(json.tweet.isRetweeted);
          setNumRetweets(json.tweet.numRetweets);
          setNumLikes(json.tweet.numLikes);
          if (json.tweet.retweetFrom) {
            setNumRetweets(1);
            if (json.tweet.retweetFrom.handle === handle) {
              setIsRetweeted(true);
              return;
            }
          }
        })
        .then(() => setLoadingStatus("loaded"))
        .catch(() => setLoadingStatus("error"));
    }

    return () => setLoadingStatus("loading");
  }, []);

  return (
    <PageWrapper>
      {loadingStatus === "loading" && <LoadingSpinnner />}
      {loadingStatus === "error" && <ErrorSection />}
      {loadingStatus === "loaded" && (
        <>
          <PageTitle title="Tweet" />
          <TweetWrapper>
            <TweeterInfo>
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
              <div style={{ marginLeft: "10px" }}>
                <StylelessLink to={`/${authorDetails.handle}`}>
                  <DisplayName>{authorDetails.displayName} </DisplayName>
                </StylelessLink>
                <Handle>@{authorDetails.handle}</Handle>
              </div>
            </TweeterInfo>
            <TweetContent>{tweetDetails.status}</TweetContent>
            {mediaDetails !== [] &&
              mediaDetails.map((media) => {
                if (media.type === "img")
                  return (
                    <>
                      <TweetImg
                        src={media.url}
                        alt={`Image for ${tweetDetails.status}`}
                      />
                    </>
                  );
              })}
            <Timestamp>
              {moment(new Date(tweetDetails.timestamp)).format("LT · ll")} ·
              Critter web app
            </Timestamp>
            <CounterSection>
              <Stat>
                <span>{tweetDetails.numRetweets}</span> Retweets
              </Stat>
              <Stat>
                <span>{tweetDetails.numLikes}</span> Likes
              </Stat>
            </CounterSection>
            <div style={{ padding: "0 15px" }}>
              <TweetActions
                isLiked={isLiked}
                numLikes={numLikes}
                numRetweets={numRetweets}
                isRetweeted={isRetweeted}
                tweetId={tweetId}
              />
            </div>
          </TweetWrapper>
        </>
      )}
    </PageWrapper>
  );
};

const TweeterInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const TweetWrapper = styled.div`
  border-top: 1px solid #ececec;
  margin-top: 48px;
  padding: 17px;
  margin-bottom: 300px;
`;

const DisplayName = styled.p`
  font-weight: 700;
  padding-bottom: 3px;
`;

const Handle = styled.p`
  font-size: 14px;
  color: 666;
`;

const TweetContent = styled.p`
  font-size: 23px;
`;

const TweetImg = styled.img`
  width: 100%;
  border-radius: 15px;
  margin: 15px 0;
`;

const Timestamp = styled.p`
  border-bottom: 1px solid #ececec;
  color: #666;
  padding-bottom: 15px;
  font-size: 14px;
  padding-top: 15px;
`;

const CounterSection = styled.div`
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #ececec;
`;

const Stat = styled.p`
  padding-right: 15px;
  color: #666;
  span {
    color: #000;
    font-weight: 700;
  }
`;
export default TweetDetails;
