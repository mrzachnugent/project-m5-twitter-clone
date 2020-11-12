import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../../CurrentUserContext";
import { PageWrapper } from "../../GlobalStyles";
import { PageTitle } from "../PageTitle";
import { PostTweet } from "./PostTweet";
import TweetOverview from "../Tweets/TweetOverview";
import { LoadingSpinnner } from "../LoadingSpinner";
import { ErrorSection } from "../ErrorSection";
import { ComingSoonModal } from "../ComingSoonModal";

const HomeFeed = ({ setIsModalOpen, isModalOpen }) => {
  const { currentUser, loadingStatus } = useContext(CurrentUserContext);
  const { handle, avatarSrc } = currentUser;
  const [feedTweetIDs, setFeedTweetIDs] = useState([]);
  const [feedStatus, setFeedStatus] = useState("loading");

  useEffect(() => {
    fetch(`/api/me/home-feed`)
      .then((res) => res.json())
      .then((json) => json.tweetIds)
      .then((ids) => {
        setFeedStatus("loaded");
        setFeedTweetIDs(ids);
      })
      .catch(() => setFeedStatus("error"));

    return setFeedStatus("loading");
  }, []);

  return (
    <>
      <PageWrapper>
        {isModalOpen && <ComingSoonModal setIsModalOpen={setIsModalOpen} />}
        {loadingStatus === "error" && <ErrorSection />}
        {loadingStatus === " loading" && <LoadingSpinnner />}
        {loadingStatus === "loaded" && feedStatus !== "error" && (
          <>
            <PageTitle title="Home" />

            <PostTweet
              avatarSrc={avatarSrc}
              handle={handle}
              setFeedTweetIDs={setFeedTweetIDs}
              feedTweetIDs={feedTweetIDs}
            />
            <Seperator />
          </>
        )}
        {feedStatus === "error" && <ErrorSection />}
        {feedStatus === "loading" && <LoadingSpinnner />}
        {feedStatus === "loaded" && (
          <>
            {feedTweetIDs.map((id) => (
              <TweetOverview
                tweetId={id}
                key={`tweet-${id}`}
                setIsModalOpen={setIsModalOpen}
              />
            ))}
          </>
        )}
        <BottomSpace />
      </PageWrapper>
    </>
  );
};

const Seperator = styled.div`
  height: 10px;
  width: 100%;
  background: #eee;
`;

const BottomSpace = styled.div`
  margin-bottom: 150px;
  border-top: 1px solid #ececec;
`;

export default HomeFeed;
