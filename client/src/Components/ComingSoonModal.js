import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export const ComingSoonModal = ({ setIsModalOpen }) => {
  const [isClosed, setIsClosed] = useState(false);
  const handleClose = () => {
    setIsClosed(!isClosed);
    setIsModalOpen(false);
  };

  const handleKeyClose = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      setIsClosed(!isClosed);
      setIsModalOpen(false);
    }
  };

  const style = useSpring({
    transform: "scale(1)",

    from: {
      transform: "scale(0)",
    },
    config: {
      tension: 1200,
      friction: 40,
    },
  });

  return (
    <>
      {!isClosed && (
        <ModalBackground
          tabIndex="0"
          onClick={handleClose}
          onKeyPress={handleKeyClose}
        >
          <Modal style={style}>
            <Icon>🚀</Icon>
            <ComingSoon>Coming soon</ComingSoon>
            <p>Click anywhere to close</p>
          </Modal>
        </ModalBackground>
      )}
    </>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled(animated.div)`
  width: 300px;
  height: 300px;
  border-radius: 15px;
  background: #fff;
  z-index: 99999999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: inset -4px -4px 10px rgba(0, 0, 0, 0.3);
`;

const Icon = styled.p`
  font-size: 95px;
`;
const ComingSoon = styled.p`
  font-size: 27px;
  padding: 25px 0;
`;
