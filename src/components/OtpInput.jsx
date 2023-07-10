import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const OtpInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, event) => {
    const value = event.target.value;

    setOtp((prevOtp) => {
      const otpArray = prevOtp.split("");
      otpArray[index] = value;
      const newOtp = otpArray.join("");
      onChange(newOtp);
      return newOtp;
    });

    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text/plain");

    setOtp(pasteData.slice(0, length));
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    if (otp.length > index) {
      inputRefs.current[index].select();
    }
  };

  return (
    <div className="flex justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="number"
          maxLength="1"
          className="w-10 h-10 border border-gray-300 rounded text-center focus:outline-blue-500 mx-auto"
          value={otp[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => handleFocus(index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          onWheel={(event) => event.currentTarget.blur()}
        />
      ))}
    </div>
  );
};

OtpInput.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OtpInput;
