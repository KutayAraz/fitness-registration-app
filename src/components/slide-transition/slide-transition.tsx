import { ReactNode, useEffect, useState } from "react";
import styles from "./slide-transition.module.css";

interface SlideTransitionProps {
  children: ReactNode;
  direction: "ltr" | "rtl";
  currentStep: number;
}

export const SlideTransition = ({ children, direction, currentStep }: SlideTransitionProps) => {
  const [prevStep, setPrevStep] = useState(currentStep);
  const [transitioning, setTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"forward" | "backward">("forward");

  // Handle step changes and trigger animations
  useEffect(() => {
    if (currentStep !== prevStep) {
      setTransitioning(true);
      setSlideDirection(currentStep > prevStep ? "forward" : "backward");
      setPrevStep(currentStep);
    }
  }, [currentStep, prevStep]);

  // Determine the appropriate slide animation class based on direction and LTR/RTL
  const getSlideClass = () => {
    if (!transitioning) return "";

    const isLTR = direction === "ltr";
    if (slideDirection === "forward") {
      return isLTR ? styles.slideLTRForward : styles.slideRTLForward;
    }
    return isLTR ? styles.slideLTRBackward : styles.slideRTLBackward;
  };

  return (
    <div
      className={`${styles.slideContainer} ${getSlideClass()}`}
      onAnimationEnd={() => setTransitioning(false)}
    >
      {children}
    </div>
  );
};
