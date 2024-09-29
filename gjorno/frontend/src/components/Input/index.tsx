import * as React from "react";
import { FC } from "react";
import "../../styles/input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: FC<InputProps> = ({ name, label }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input id={name}></input>
    </div>
  );
};

export default Input;
