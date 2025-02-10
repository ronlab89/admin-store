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
    },
    ref
  ) => {
    return (
      <div className={`w-[42%] pb-2 ${divStyles}`}>
        <label
          className="w-full flex justify-between items-center mb-2 text-xs text-Shippingco-900 dark:text-Shippingco-100"
          htmlFor={id}
        >
          {label}
          <Suspense fallback={""}>
            <FormErrors error={errorId} />
          </Suspense>
        </label>
        <select
          className={`${styles} lowercase flex h-9 w-full rounded-md border border-[#27272a] dark:border-gray-500 border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors font-medium text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#a1a1aa] dark:focus-visible:ring-[#d4d4d8] disabled:cursor-not-allowed disabled:opacity-50`}
          id={id}
          error={error}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          ref={ref}
        >
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
