import { motion } from "framer-motion";
import React, { CSSProperties } from "react";

export type TransitionDirection = "forward" | "backward";

interface TransitionWrapperProps {
  direction: TransitionDirection;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  direction,
  children,
  className,
  style,
}) => {
  const transitionVariants = {
    initial:
      direction === "forward"
        ? { opacity: 0, x: 100 }
        : { opacity: 0, x: -100 },
    exit:
      direction === "forward"
        ? { opacity: 0, x: -100 }
        : { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="initial"
      exit="exit"
      animate="animate"
      variants={transitionVariants}
      transition={{ duration: 0.5 }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
