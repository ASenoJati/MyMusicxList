import React from "react";

const Errors = ({ children }) => {
  return <p className="text-red-500 text-sm mt-1">{children}</p>;
};

export default Errors;
