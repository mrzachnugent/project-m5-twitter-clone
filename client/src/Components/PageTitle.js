import React from "react";
import styled from "styled-components";

export const PageTitle = ({ title }) => {
  return (
    <TitleContainer>
      <PageH1>{title}</PageH1>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  position: fixed;
  width: 100%;

  height: 48px;
  top: 0;
  background: #fff;
`;

const PageH1 = styled.h1`
  font-size: 24px;

  padding: 10px 0 10px 10px;
`;
