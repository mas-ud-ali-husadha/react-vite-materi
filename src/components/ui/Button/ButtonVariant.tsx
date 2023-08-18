import classNames from "classnames";

const ButtonVariant = (variant?: string) =>
  classNames({
    // "bg-white hover:bg-gray-100": "default",
    "bg-primary text-white hover:bg-slate-700": variant == "primary",
    "bg-slate-700 text-white": variant == "secondary",
    "bg-primary text-white border border-borderPrimary shadow hover:bg-slate-700":
      variant == "primary-border",
    "bg-white border border-primary text-primary hover:bg-white ":
      variant == "primary-outlined",
  });

export default ButtonVariant;
