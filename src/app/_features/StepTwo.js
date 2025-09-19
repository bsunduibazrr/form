"use client";
import Image from "next/image";

import { useState } from "react";
import { FormInput } from "../_component/form-input";
const addStepTwoValuesToLocalStorage = (values) => {
  localStorage.setItem("stepTwo", JSON.stringify(values));
};

export const StepTwo = (props) => {
  const { handleNextStep, handleBackStep } = props;

  const [filter, setFilter] = useState("");
  const getStepTwoValuesFromLocalStorage = () => {
    const values = localStorage.getItem("stepTwo");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        firstName: "",
        lastName: "",
        userName: "",
      };
    }
  };

  const [formValues, setFormValues] = useState(
    getStepTwoValuesFromLocalStorage
  );

  const stringObject = JSON.stringify(formValues);
  console.log(stringObject);

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    userNameError: "",
    passwordError: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateName = (name) => {
    const regex = /@.[a-z]/;
    return regex.test(name);
  };
  const validateName2 = (name2) => {
    const regex2 = /^\d{8}$/;
    return regex2.test(name2);
  };

  const handleContinue = () => {
    let newErrors = {
      firstNameError: "",
      lastNameError: "",
      userNameError: "",
      passwordError: "",
    };

    let isValid = true;

    if (!validateName(formValues.firstName)) {
      newErrors.firstNameError = "Please provide a valid email address.";
      isValid = false;
    }

    if (!validateName2(formValues.lastName)) {
      newErrors.lastNameError = "Please enter a valid phone number.";
      isValid = false;
    }

    if (formValues.userName.length < 5) {
      newErrors.userNameError = "Password must include letters and numbers.";
      isValid = false;
    }

    if (formValues.password !== formValues.userName) {
      newErrors.passwordError = "Passwords do not match. Please try again.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      addStepTwoValuesToLocalStorage(formValues);
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
          <FormInput
            inputTag={"Email *"}
            handleChange={handleInputChange}
            name={"firstName"}
            value={formValues.firstName}
            error={errors.firstNameError}
            errorMessage={"Please provide a valid email address."}
            type={"text"}
          />
          <FormInput
            inputTag={"Phone Number *"}
            handleChange={handleInputChange}
            name={"lastName"}
            value={formValues.lastName}
            error={errors.lastNameError}
            errorMessage={"Please enter a valid phone number."}
            type={"tel"}
          />
          <FormInput
            inputTag={"Password *"}
            handleChange={handleInputChange}
            name={"userName"}
            value={formValues.userName}
            error={errors.userNameError}
            errorMessage={"Password must include letters and numbers."}
            type={"password"}
          />
          <FormInput
            inputTag={"Confirm Password *"}
            handleChange={handleInputChange}
            name={"password"}
            value={formValues.password}
            error={errors.passwordError}
            errorMessage={"Passwords do not match. Please try again."}
            type={"password"}
          />

          <div
            style={{
              paddingBottom: "32px",
              paddingTop: "142px",
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              style={{
                width: "128px",
                height: "44px",
                backgroundColor: "#CBD5E1",
                color: "black",
                borderRadius: "8px",
              }}
              onClick={handleBackStep}
            >
              ◀︎ Back
            </button>
            <button
              style={{ width: "280px", height: "44px" }}
              className="button"
              onClick={handleContinue}
            >
              Continue 2/3 ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
