import React from "react";
import { Icon } from "react-icons-kit";
import { loading } from "react-icons-kit/ikons/loading";
import styled from "styled-components";
import { COLORS } from "../constants";

export const LoadingSpinnner = () => {
  return (
    <IconWrapper>
      <SpinnerIcon size={32} icon={loading} />
    </IconWrapper>
  );
};

export const LittleLoadingSpinnner = () => {
  return (
    <>
      <SpinnerIcon size={21} icon={loading} />
    </>
  );
};

const IconWrapper = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.primary};
`;

const SpinnerIcon = styled(Icon)`
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
