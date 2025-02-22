import PropTypes from "prop-types";
const classNames = (...classes) => classes.filter(Boolean).join(" ");

const Button = ({
  size,
  icon,
  variant,
  rounded,
  children,
  className,
  ...props
}) => (
  <button
    className={classNames(
      "duration-150 active:shadow-lg",

      variant === "primary"
        ? "bg-indigo-600 text-white hover:bg-indigo-700"
        : variant === "secondary"
        ? "bg-indigo-50 text-indigo-600 shadow-sm ring-indigo-300 hover:bg-indigo-100 active:bg-indigo-200 active:ring-1"
        : variant === "outline"
        ? "border border-gray-400 text-gray-700 hover:border-indigo-600 active:shadow-lg"
        : variant === "disabled"
        ? "cursor-not-allowed bg-indigo-300 text-white"
        : variant === "icon"
        ? "flex items-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 active:bg-indigo-200"
        : "",

      size === "xs"
        ? "px-3 py-1.5"
        : size === "sm"
        ? "px-4 py-2"
        : size === "md"
        ? "px-5 py-3"
        : size === "lg"
        ? "px-6 py-3.5"
        : "px-4 py-2",

      rounded === "xs"
        ? "rounded-sm"
        : rounded === "sm"
        ? "rounded"
        : rounded === "md"
        ? "rounded-md"
        : rounded === "lg"
        ? "rounded-lg"
        : rounded === "full"
        ? "rounded-full"
        : "rounded",

      className
    )}
    {...props}
  >
    {icon} {children}
  </button>
);

Button.defaultProps = {
  variant: "primary",
  rounded: "lg",
  size: "lg",
};

Button.propType = {
  className: PropTypes.string,

  children: PropTypes.node.isRequired,

  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),

  rounded: PropTypes.oneOf(["xs", "sm", "md", "lg"]),

  icon: PropTypes.any,

  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "outline",
    "disabled",
    "icon",
  ]),
};

export default Button;
