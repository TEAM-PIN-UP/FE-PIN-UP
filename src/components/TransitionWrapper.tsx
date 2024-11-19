import { motion, Variants } from "framer-motion";
import React, { CSSProperties } from "react";

export type TransitionDirection = "forward" | "backward";

interface TransitionWrapperProps {
  children: React.ReactNode;
  direction?: TransitionDirection;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({
  children,
  direction = "forward",
  duration = 0.5,
  className,
  style,
}) => {
  const transitionVariants: Variants = {
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
      transition={{ duration: duration }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default TransitionWrapper;
