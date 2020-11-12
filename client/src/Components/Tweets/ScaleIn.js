import React from "react";
import { useSpring, animated } from "react-spring";

export const ScaleIn = ({ children }) => {
  const style = useSpring({
    transform: "scale(1) rotateX(0deg)",
    paddingTop: "6px",
    perspective: "50px",
    from: {
      transform: "scale(0) rotateX(360deg)",
      paddingTop: "6px",
    },
    config: {
      tension: 1200,
      friction: 30,
    },
  });

  return <animated.div style={style}>{children}</animated.div>;
};
