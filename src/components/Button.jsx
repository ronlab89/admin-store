import { useNavigate } from "react-router-dom";

const ButtonDashed = ({
  text,
  icon,
  type,
  url,
  onClick,
  styles,
  disabled,
  mode,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) {
      navigate(url);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {mode === "form" ? (
        <button
          type={type}
          onClick={handleClick}
          disabled={disabled}
          className={`${styles} relative !p-[3px] inline-flex items-center justify-center overflow-hidden text-xs font-medium text-slate-900 rounded-[20px] group bg-gradient-to-br from-teal-600 dark:from-teal-400 to-teal-400 dark:to-teal-600 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-slate-100 focus:ring-0 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800`}
        >
          <span
            className={`relative px-5 py-1.5 ease-in duration-75 bg-slate-100 dark:bg-slate-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent`}
          >
            {text}
          </span>
        </button>
      ) : (
        <button className={`${styles}`}>{text}</button>
      )}
    </>
  );
};

export default ButtonDashed;
