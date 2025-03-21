const Details = ({ width, height, styles }) => {
  return (
    <svg width={width} height={height} className={styles} viewBox="0 0 36 36">
      <path
        fill="currentColor"
        d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m0 22H4V8h28Z"
        className="clr-i-outline clr-i-outline-path-1"
      />
      <path
        fill="currentColor"
        d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2"
        className="clr-i-outline clr-i-outline-path-2"
      />
      <path
        fill="currentColor"
        d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2"
        className="clr-i-outline clr-i-outline-path-3"
      />
      <path
        fill="currentColor"
        d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2"
        className="clr-i-outline clr-i-outline-path-4"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
};

export default Details;
