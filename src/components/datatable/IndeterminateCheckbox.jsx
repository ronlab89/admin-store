import React, { useEffect, useRef } from "react";

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <>
      <label htmlFor={ref} className="sr-only"></label>
      <input
        id={ref}
        type="checkbox"
        ref={ref}
        className={`${className} cursor-pointer`}
        {...rest}
      />
    </>
  );
}

export default IndeterminateCheckbox;
