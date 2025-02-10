const Password = ({ width, height, styles }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" className={styles}>
      <path
        fill="currentColor"
        d="M12.75 15.5a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0z"
      />
      <path
        fill="currentColor"
        d="M12 1.25A4.75 4.75 0 0 0 7.25 6v2.696a7.5 7.5 0 1 0 9.5 0V6A4.75 4.75 0 0 0 12 1.25M12 7a7.5 7.5 0 0 0-3.25.739V6a3.25 3.25 0 0 1 6.5 0v1.739A7.5 7.5 0 0 0 12 7m0 1.5a6 6 0 1 1 0 12a6 6 0 0 1 0-12"
      />
    </svg>
  );
};

export default Password;
