// CustomButton.js
import React from "react";

const CustomButton = ({ text, onClick, disable }) => {
  if (disable) {
    return (
      <button
        className="    px-5  shadow-gradient flex items-center w-full mt-4 rounded-md text-white hover:opacity-90 hover:text-gray-400  transition-opacity cursor-not-allowed"
        style={{
          background: "linear-gradient(to right, #A3346B, #632C61)", // Use inline style for gradient
        }}
      >
        Submitted
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="    px-5  shadow-gradient flex items-center  mt-4 rounded-md text-white hover:opacity-90 hover:text-gray-400  transition-opacity"
      style={{
        background: "linear-gradient(to right, #A3346B, #632C61)", // Use inline style for gradient
      }}
    >
      {text}
    </button>
  );
};

export default CustomButton;
