"use client";
import Image from "next/image";

import { useState } from "react";
import { FormInput } from "../_component/form-input";

export const StepFour = (props) => {
  const { handleBackStep } = props;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "250px",
      }}
    >
      <div className="header2">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <img className="logo" src="/logo.png" alt="logo" />
          <p className="text">You're All Set!🔥</p>
          <p className="text2">We have received your submission. Thank you!</p>
        </div>
      </div>
    </div>
  );
};
