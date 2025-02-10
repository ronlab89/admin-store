const Batch = ({ width, height, styles }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className={`${styles}`}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M19 15h4V1H9v4m6 14h4V5H5v4M1 23h14V9H1z"
      />
    </svg>
  );
};

export default Batch;
