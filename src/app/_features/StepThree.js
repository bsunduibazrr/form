"use client";
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
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    setImage(null);
  };

  const handleContinue = () => {
    let newErrors = { dob: "", image: "" };
    let isValid = true;

    if (!dob) {
      newErrors.dob = "Please select a date.";
      isValid = false;
    } else {
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        newErrors.dob = "You must reached 18 to submit .";
        isValid = false;
      }
    }

    if (!image) {
      newErrors.image = "Image cannot be blank.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      handleNextStep();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        <div className="flex" style={{ flexDirection: "column", gap: "0px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxWidth: "416px",
              paddingTop: "15px",
            }}
          >
            <p className="text3">Date of Birth *</p>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{
                width: "100%",
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxWidth: "416px",
              position: "relative",
              marginTop: "24px",
            }}
          >
            <p className="text3">Profile Image *</p>

            {!image && (
              <input
                type="file"
                id="imagePreview"
                accept="image/*"
                onChange={handleImageChange}
                className="image"
                style={{ cursor: "pointer" }}
              />
            )}

            {image && (
              <div style={{ position: "relative", width: "100%" }}>
                <img
                  src={image}
                  alt="Preview"
                  className="preview"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <button className="removebtn" onClick={handleRemove}>
                  ✕
                </button>
              </div>
            )}

            {errors.image && (
              <p style={{ color: "red", paddingTop: "10px" }}>{errors.image}</p>
            )}
          </div>

          <div
            style={{
              paddingBottom: "32px",
              paddingTop: "102px",
              display: "flex",
              gap: "8px",
              maxWidth: "416px",
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
              Submit 3/3 ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
