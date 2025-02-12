const Phone = ({ width, height, styles }) => {
  return (
    <svg width={width} height={height} className={styles} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M11 17.5a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 2a2.25 2.25 0 0 0-2.25 2.25v15.5A2.25 2.25 0 0 0 8 22h8a2.25 2.25 0 0 0 2.25-2.25V4.25A2.25 2.25 0 0 0 16 2zm-.75 2.25A.75.75 0 0 1 8 3.5h8a.75.75 0 0 1 .75.75v15.5a.75.75 0 0 1-.75.75H8a.75.75 0 0 1-.75-.75z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default Phone;
