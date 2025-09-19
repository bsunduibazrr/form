"use client";
import Image from "next/image";

import { useState } from "react";
import { FormInput } from "../_component/form-input";

const addStepOneValuesToLocalStorage = (values) => {
  localStorage.setItem("stepOne", JSON.stringify(values));
};

export const StepOne = (props) => {
  const { handleNextStep } = props;
  const [filter, setFilter] = useState("");

  const getStepOneValuesFromLocalStorage = () => {
    const values = localStorage.getItem("stepOne");
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
    getStepOneValuesFromLocalStorage
  );

  const stringObject = JSON.stringify(formValues);
  console.log(stringObject);

  const [errors, setErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    userNameError: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z]{2,}$/;
    return regex.test(name);
  };

  const handleContinue = () => {
    let newErrors = {
      firstNameError: "",
      lastNameError: "",
      userNameError: "",
    };

    let isValid = true;

    if (!validateName(formValues.firstName)) {
      newErrors.firstNameError =
        "First name cannot contain special characters or numbers.";
      isValid = false;
    }

    if (!validateName(formValues.lastName)) {
      newErrors.lastNameError =
        "Last name cannot contain special characters or numbers.";
      isValid = false;
    }

    if (formValues.userName.length < 5) {
      newErrors.userNameError =
        "This username is already taken. Please choose another one.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      addStepOneValuesToLocalStorage(formValues);
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
            inputTag={"First Name *"}
            handleChange={handleInputChange}
            name={"firstName"}
            value={formValues.firstName}
            error={errors.firstNameError}
            errorMessage={
              "First name cannot contain special characters or numbers."
            }
          />
          <FormInput
            inputTag={"Last Name *"}
            handleChange={handleInputChange}
            name={"lastName"}
            value={formValues.lastName}
            error={errors.lastNameError}
            errorMessage={
              "Last name cannot contain special characters or numbers."
            }
          />
          <FormInput
            inputTag={"User Name *"}
            handleChange={handleInputChange}
            name={"userName"}
            value={formValues.userName}
            error={errors.userNameError}
            errorMessage={
              "This username is already taken. Please choose another one."
            }
          />

          <div style={{ paddingBottom: "32px", paddingTop: "142px" }}>
            <button className="button" onClick={handleContinue}>
              Continue 1/3 ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
