"use client";
import { useState } from "react";
import { StepOne } from "./_features/StepOne";
import { StepTwo } from "./_features/StepTwo";
import { StepThree } from "./_features/StepThree";
import { StepFour } from "./_features/StepFour";
import "./style.css";

export default function Home() {
  const [step, setStep] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("forward");
  const [removeButton, setRemoveButton] = useState(null);
  const [image, setImage] = useState(null);

  const handleNextStep = () => {
    setDirection("forward");
    setTransitioning(true);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setTransitioning(false);
    }, 300);
  };

  const handleBackStep = () => {
    if (step === 1) return;
    setDirection("backward");
    setTransitioning(true);
    setTimeout(() => {
      setStep((prev) => prev - 1);
      setTransitioning(false);
    }, 300);
  };

  const getStepComponent = () => {
    switch (step) {
      case 1:
        return <StepOne handleNextStep={handleNextStep} />;
      case 2:
        return (
          <StepTwo
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        );
      case 3:
        return (
          <StepThree
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        );
      case 4:
        return (
          <StepFour
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`step-container ${
        transitioning
          ? direction === "forward"
            ? "fade-out-left"
            : "fade-out-right"
          : "fade-in"
      }`}
    >
      {getStepComponent()}
    </div>
  );
}
