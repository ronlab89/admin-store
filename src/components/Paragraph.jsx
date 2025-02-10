const variants = {
  default: "text-base text-gray-800",
  muted: "text-sm text-gray-500",
  highlight: "text-lg font-semibold text-blue-600",
  normal:
    "font-normal text-[0.65rem] min-[22.5rem]:text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] min-[51.25rem]:text-[1.2rem] lg:text-[0.85rem] xl:text-[1rem] 2xl:text-[1rem] text-balance tracking-[0.05rem] text-portfolio-base-200",
  legal:
    "font-normal text-[0.65rem] min-[22.5rem]:text-[0.8rem] sm:text-[1rem] md:text-[1.1rem] min-[51.25rem]:text-[1.2rem] lg:text-[0.85rem] xl:text-[1rem] 2xl:text-[1rem] tracking-[0.05rem] text-portfolio-base-200",
  error: "text-base text-red-600",
};

const Paragraph = ({
  variant = "default",
  children,
  className = "",
  id,
  ref,
}) => {
  return (
    <p id={id} ref={ref} className={`${variants[variant]} ${className}`.trim()}>
      {children}
    </p>
  );
};

export default Paragraph;
