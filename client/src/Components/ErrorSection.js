import React from "react";
import { Icon } from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import styled from "styled-components";

export const ErrorSection = () => {
  return (
    <ErrorContainer>
      <Icon icon={bomb} size={64} />
      <ErrorTitle>An unknown error has occured</ErrorTitle>
      <p>
        Please try refreshing the page, or <a href="/">contact support</a> if
        the problem persists.
      </p>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const ErrorTitle = styled.h2`
  padding: 50px 0;
`;
