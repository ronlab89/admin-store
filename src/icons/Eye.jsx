const Eye = ({ width, height, styles }) => {
  return (
    <svg width={width} height={height} className={styles} viewBox="0 0 24 24">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M3 13c3.6-8 14.4-8 18 0" />
        <path d="M12 17a3 3 0 1 1 0-6a3 3 0 0 1 0 6" />
      </g>
    </svg>
  );
};

export default Eye;
