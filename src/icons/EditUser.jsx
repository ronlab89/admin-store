const EditUser = ({ width, height, styles }) => {
  return (
    <svg width={width} height={height} className={styles} viewBox="0 0 14 14">
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="5" cy="2.75" r="2.25" />
        <path d="M3.5 12.5h-3V11A4.51 4.51 0 0 1 7 7m6.5 1.5l-4.71 4.71l-2.13.29l.3-2.13l4.7-4.71L13.5 8.5z" />
      </g>
    </svg>
  );
};

export default EditUser;
