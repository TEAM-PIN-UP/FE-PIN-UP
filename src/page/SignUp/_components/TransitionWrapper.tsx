import { motion } from "framer-motion";
import React from "react";

export type TransitionDirection = "forward" | "backward";

interface TransitionWrapperProps {
  direction: TransitionDirection;
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  direction,
  children,
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
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
