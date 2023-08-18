import React from "react";
import ButtonVariant from "./ButtonVariant";
import { IconType } from "react-icons";

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "default"
    | "secondary"
    | "primary-border"
    | "primary-outlined";
  text?: string;
  icon?: IconType;
  className?: string;
}

const Button = ({
  variant = "primary",
  icon: Icon,
  text,
  className,
  ...props
}: ButtonType) => {
  const style = ButtonVariant(variant);
  return (
    <button
      className={`button ${style} ${
        className ? String(className) : ""
      }  transition-all `}
      {...props}
    >
      {Icon && <Icon size="1.2em" />}
      {text}
    </button>
  );
};

export default Button;
