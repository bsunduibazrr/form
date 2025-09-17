"use client";
import Image from "next/image";
import { useState } from "react";

export const StepThree = (props) => {
  const { handleNextStep, handleBackStep } = props;

  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({
    dob: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleContinue = () => {
    let newErrors = { dob: "", image: "" };
    let isValid = true;

    if (!dob) {
      newErrors.dob = "Date of birth is required.";
      isValid = false;
    }

    if (!image) {
      newErrors.image = "Profile image is required.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      handleNextStep();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "250px",
      }}
    >
      <div className="header">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <img className="logo" src="/logo.png" alt="logo" />
          <p className="text">Join us!😎</p>
          <p className="text2">
            Please provide all current information accurately.
          </p>
        </div>
        <div className="flex">
          <div
            style={{
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <p className="text3">Date of Birth *</p>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{
                width: "416px",
                height: "44px",
                border: errors.dob ? "1px solid red" : "1px solid #CBD5E1",
                color: "black",
                paddingLeft: "15px",
                borderRadius: "8px",
              }}
            />
            {errors.dob && (
              <p style={{ color: "red", paddingTop: "10px" }}>{errors.dob}</p>
            )}
          </div>

          <div
            className="stepthree"
            style={{ display: "flex", flexDirection: "column", gap: "6px" }}
          >
            <p className="text3">Profile Image *</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image"
            />
            {errors.image && (
              <p style={{ color: "red", paddingTop: "10px" }}>{errors.image}</p>
            )}
          </div>

          <div
            style={{
              paddingBottom: "32px",
              paddingTop: "142px",
              display: "flex",
              gap: "8px",
            }}
          >
            <button className="backbtn" onClick={handleBackStep}>
              ◀︎ Back
            </button>
            <button
              style={{ width: "280px", height: "44px" }}
              className="button"
              onClick={handleContinue}
            >
              Continue 3/3 ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
