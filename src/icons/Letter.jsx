const Letter = ({ width, height, styles }) => {
  return (
    <svg
      width={width}
      height={height}
      className={`${styles}`}
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 15.5a3.5 3.5 0 1 0 7 0a3.5 3.5 0 1 0-7 0M3 19V8.5a3.5 3.5 0 0 1 7 0V19m-7-6h7m11-1v7"
      />
    </svg>
  );
};

export default Letter;
