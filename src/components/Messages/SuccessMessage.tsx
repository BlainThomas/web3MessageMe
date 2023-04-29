import React from "react";

interface SuccessMessageProps {
  message?: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="alert alert-success">
      <div className="flex-1">
        <label>{message}</label>
      </div>
    </div>
  );
};