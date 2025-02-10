const FormErrors = ({ error }) => {
  return (
    <>
      {error && (
        <p className="mb-0 text-[0.8rem] text-red-600 text-end">
          {error.message}
        </p>
      )}
    </>
  );
};

export default FormErrors;
