import { forwardRef, lazy, Suspense } from "react";

import { useToggleStore } from "@/store/toggle.store";

const FormErrors = lazy(() => import("./FormErrors"));
import Eye from "@/icons/Eye";
import EyeClosed from "@/icons/EyeClosed";

const InputText = forwardRef(
  (
    {
      icon,
      text,
      type,
      id,
      min,
      max,
      placeholder,
      value,
      readOnly,
      disabled,
      error,
      errorId,
      onChange,
      onBlur,
      name,
      checked,
      divStyles,
      styles,
      mode,
    },
    ref
  ) => {
    const toggleShow = useToggleStore((state) => state.toggleShow);
    const handleToggleShow = useToggleStore((state) => state.handleToggleShow);

    return (
      <div
        className={`pb-2 ${
          type === "checkbox"
            ? "w-[42%] pt-5 flex justify-start items-center flex-row-reverse gap-2"
            : `${divStyles}`
        }`}
      >
        <label
          htmlFor={id}
          className="w-full flex justify-between items-center mb-2 text-xs text-slate-900 dark:text-slate-100"
        >
          <span>{text}</span>
          <Suspense fallback={""}>
            <FormErrors error={errorId} />
          </Suspense>
        </label>
        <div className="relative text-slate-600 dark:text-slate-400">
          <span
            className={`${
              type === "checkbox" ? "hidden" : ""
            } absolute inset-y-0 left-0 flex items-center p-1 pl-3`}
          >
            {icon}
          </span>
          <input
            type={type}
            error={error}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            max={max}
            ref={ref}
            readOnly={readOnly}
            disabled={disabled}
            value={value}
            name={name}
            id={id}
            checked={checked}
            placeholder={placeholder}
            autoComplete="off"
            className={`${
              type === "checkbox"
                ? "w-4 h-4 text-teal-600 bg-slate-100 border-slate-300 rounded-[.5rem] focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                : `${styles} flex pl-12 h-9 w-full rounded-[.5rem] border border-slate-100 dark:border-slate-900 border-input ${
                    mode === "login"
                      ? "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  } px-3 py-1 text-xs shadow-sm font-medium  placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`
            }`}
          />
          <span
            onClick={() => handleToggleShow(!toggleShow.status, id)}
            className={`${
              id === "password" || id === "repassword" ? "" : "hidden"
            } absolute inset-y-0 right-0 flex items-center p-1 pr-3 cursor-pointer`}
          >
            {toggleShow.status && toggleShow.id === id ? (
              <EyeClosed
                width={16}
                height={16}
                styles={"text-teal-600 dark:text-teal-400"}
              />
            ) : (
              <Eye
                width={16}
                height={16}
                styles={
                  "hover:text-teal-600 hover:transition-colors dark:hover:text-teal-400"
                }
              />
            )}
          </span>
        </div>
      </div>
    );
  }
);

export default InputText;
