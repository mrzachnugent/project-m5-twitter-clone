import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { COLORS } from "./constants";

const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: sans-serif;
  }

  .page {
      margin-left: 300px;
  }

  
  @media only screen and (max-width: 1100px) {
    .menu-text {
      display: none;
}
}
`;

export const PageWrapper = styled.div`
  margin-left: 300px;
  border: 1px solid #ececec;
  max-width: 800px;
  min-height: 90vh;
  position: relative;
  @media only screen and (max-width: 1100px) {
    margin-left: 120px;
  }
`;

export const ProfileAvatar = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

export const PrimaryButton = styled.button`
  border: 2px solid transparent;
  background: ${COLORS.primary};
  border-radius: 25px;
  padding: 10px 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  min-width: 95px;
  &:active {
    transform: scale(0.97);
  }

  &:focus {
    outline: none;
    border: 2px solid ${COLORS.focused};
  }
  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

export const StylelessLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:focus {
    outline-color: ${COLORS.focused};
  }
`;

export default GlobalStyles;
