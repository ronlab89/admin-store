import { useNavigate } from "react-router-dom";

const Button = ({
  text,
  icon,
  type = "button",
  url,
  onClick,
  styles = "",
  disabled = false,
  mode = "default",
  variant = "primary",
  iconPosition = "left",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    if (url) {
      navigate(url);
    }
    if (onClick) {
      onClick();
    }
  };

  const baseStyles = `
  inline-flex items-center justify-center 
  font-medium rounded-[.5rem] hover:transition-colors 
  focus:outline-none focus:ring-0 focus:ring-offset-0 
  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
`;

  // Variantes de diseño
  const variants = {
    primary: `
    group bg-gradient-to-br from-teal-600 dark:from-teal-400 to-teal-400 dark:to-teal-600 
      group-hover:from-teal-400 group-hover:to-teal-600 dark:group-hover:from-teal-400 dark:group-hover:to-teal-600
  `,
    secondary: `
    bg-gradient-to-br from-indigo-600 dark:from-indigo-400 to-indigo-400 dark:to-indigo-600 
    hover:from-indigo-300 hover:to-purple-300 dark:hover:from-indigo-500 dark:hover:to-purple-500 
    text-slate-900 dark:text-slate-100 focus:ring-purple-200 dark:focus:ring-purple-800
  `,
    outline: `
    border border-teal-600 dark:border-teal-400 
    hover:bg-teal-400 hover:text-slate-200 dark:hover:bg-teal-400 dark:hover:text-slate-800 
    text-teal-600 dark:text-teal-400 focus:ring-teal-200 dark:focus:ring-teal-800
  `,
    dashed: `
    border border-dashed border-teal-600 dark:border-teal-400 
    hover:bg-teal-600 hover:text-slate-100 dark:hover:bg-teal-400 dark:hover:text-slate-900 
    text-teal-600 dark:text-teal-400 focus:ring-teal-200 dark:focus:ring-teal-800
  `,
    cancel: `
    text-slate-800 border-0 focus:outline-none !bg-slate-100 rounded-md border-slate-100 hover:!bg-slate-300 hover:text-slate-700 focus:z-10 focus:ring-0 focus:ring-gray-100 dark:focus:ring-gray-700 dark:!bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:text-slate-200 dark:hover:!bg-slate-700 hover:transition-colors`,
    danger: `text-slate-100 dark:text-slate-200 border-0 !bg-red-500 hover:!bg-red-600 focus:ring-0 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-1.5 text-center dark:!bg-red-600 dark:hover:!bg-red-400 dark:focus:ring-red-800 hover:transition-colors`,
  };

  const modeStyles = {
    form: `
      relative !p-[3px] overflow-hidden 
      group bg-gradient-to-br from-teal-600 dark:from-teal-400 to-teal-400 dark:to-teal-600 
      group-hover:from-teal-600 group-hover:to-teal-400 dark:group-hover:from-teal-400 dark:group-hover:to-teal-600
    `,
    default: "",
  };

  const buttonClasses = `
  ${baseStyles} 
  ${variants[variant]} 
  ${mode === "form" ? modeStyles.form : ""} 
  ${styles}
`;

  // Renderizar ícono
  const renderIcon = () => {
    if (!icon) return null;
    return React.cloneElement(icon, {
      className: `w-5 h-5 ${iconPosition === "left" ? "mr-2" : "ml-2"}`,
    });
  };

  return (
    <>
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        aria-disabled={disabled}
        className={buttonClasses}
      >
        {mode === "form" ? (
          <span
            className={`relative px-5 py-1 text-sm ease-in duration-75 bg-slate-100 dark:bg-slate-900 rounded-[.4rem] group-hover:bg-transparent group-hover:dark:bg-transparent`}
          >
            {iconPosition === "left" && renderIcon()}
            {text}
            {iconPosition === "right" && renderIcon()}
          </span>
        ) : (
          <>
            {iconPosition === "left" && renderIcon()}
            {text}
            {iconPosition === "right" && renderIcon()}
          </>
        )}
      </button>
    </>
  );
};

export default Button;
