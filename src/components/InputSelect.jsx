import { forwardRef, lazy, Suspense } from "react";
const FormErrors = lazy(() => import("./FormErrors"));

const InputSelect = forwardRef(
  (
    {
      label,
      id,
      icon,
      defaultOption,
      options,
      error,
      onChange,
      onBlur,
      name,
      errorId,
      divStyles,
      styles,
      mode,
    },
    ref
  ) => {
    return (
      <div className={`w-[42%] pb-2 ${divStyles}`}>
        <label
          className="w-full flex justify-between items-center mb-2 text-xs text-slate-900 dark:text-slate-100"
          htmlFor={id}
        >
          {label}
          <Suspense fallback={""}>
            <FormErrors error={errorId} />
          </Suspense>
        </label>
        <select
          className={`${styles} lowercase flex h-9 w-full rounded-md border border-slate-100 dark:border-slate-900 ${
            mode === "login"
              ? "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          } border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`}
          id={id}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        >
          <option defaultValue={defaultOption} value={defaultOption} disabled>
            {defaultOption}
          </option>
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default InputSelect;
