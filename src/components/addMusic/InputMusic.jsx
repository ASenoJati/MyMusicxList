import React from "react";
import Errors from "./Errors";

const InputMusic = ({ value, onChange, errors, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      {errors && <Errors>{errors}</Errors>}
    </div>
  );
};

export default InputMusic;
