import React, { useEffect, useState } from "react";
import { ProfileAvatar, PrimaryButton } from "../../GlobalStyles";
import styled from "styled-components";
import { LittleLoadingSpinnner } from "../LoadingSpinner";

export const PostTweet = ({
  avatarSrc,
  handle,
  feedTweetIDs,
  setFeedTweetIDs,
}) => {
  const [count, setCount] = useState(280);
  const [isDiabled, setIsDisabled] = useState(true);
  const [tweetContent, setTweetContent] = useState("");
  const [newTweetStatus, setNewTweetStatus] = useState(null);

  const handleCharacterCount = (e) => {
    setCount(280 - e.target.textContent.length);
    setTweetContent(e.target.textContent);
  };

  const handleTweetSubmission = async (e) => {
    e.preventDefault();
    document.getElementById("input").textContent = "";
    setNewTweetStatus("loading");
    setTweetContent("");
    setCount(280);
    await fetch("/api/tweet", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: `${tweetContent}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedTweetIDs([data.tweet.id, ...feedTweetIDs]);
      })
      .then(() => setNewTweetStatus(null));
  };

  useEffect(() => {
    if (count < 278) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [count]);

  return (
    <Wrapper>
      <ProfileAvatar src={avatarSrc} alt={`${handle}'s avatar`} />
      <TweetForm onSubmit={handleTweetSubmission}>
        <TweetInput>
          <span
            contentEditable
            role="textbox"
            onInput={handleCharacterCount}
            id="input"
          />
        </TweetInput>
        <CountAndSubmit>
          <CountText colorCondition={count}>{count}</CountText>

          <PrimaryButton type="submit" disabled={isDiabled} id="meow">
            {!newTweetStatus && <span>Meow</span>}
            {newTweetStatus && <LittleLoadingSpinnner />}
          </PrimaryButton>
        </CountAndSubmit>
      </TweetForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 1px solid #ececec;
  margin-top: 48px;
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #ececec;
`;

const TweetForm = styled.form`
  padding-left: 10px;
  width: 90%;
  box-sizing: border-box;
`;

const TweetInput = styled.p`
  display: block;
  width: 97%;
  font-size: 21px;
  padding: 15px 0;

  span {
    display: block;

    box-sizing: border-box;

    &[contenteditable]:empty::before {
      content: "What's happening?";
      color: gray;
    }
    &:focus {
      outline: none;
    }
  }
`;

const CountAndSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 10px;
`;

const CountText = styled.p`
  padding-right: 20px;
  color: ${(props) => {
    return props.colorCondition > 55
      ? "#ccc"
      : props.colorCondition > -1
      ? "#f8ad57"
      : "#dd3d3d";
  }};
  font-weight: ${(props) => (props.colorCondition < 0 ? "900" : "500")};
`;
