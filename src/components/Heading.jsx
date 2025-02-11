import { forwardRef } from "react";

const headingStyles = {
  h1: "lg:text-[46px] xl:text-[51px] 2xl:text-[61px] font-bold lg:leading-[58.35px] xl:leading-[68.35px] 2xl:leading-[3rem]",
  h2: "lg:text-[36px] xl:text-[40px] min-[1440px]:text-[49px] font-bold lg:leading-[50.15px] min-[1440px]:leading-[66.15px] tracking-[.01rem]",
  h3: "lg:text-[24px] min-[1440px]:text-[29px] font-medium lg:leading-[34.15px] min-[1440px]:leading-[39.15px] tracking-[.01rem]",
  "h3.subtitle":
    "text-[1.2rem] min-[24.375rem]:text-[1.3rem] sm:text-[1.4rem] md:text-[1.5rem] min-[51.25rem]:text-[1.6rem] lg:text-[1.4rem] xl:text-[1.5rem] min-[90rem]:text-[1.6rem] 2xl:text-[1.8rem] leading-[0.8rem] min-[24.375rem]:leading-[0.9rem] sm:leading-[1rem] md:leading-[1rem] min-[51.25rem]:leading-[1.1rem] lg:leading-[1rem] xl:leading-[1.1rem] min-[90rem]:leading-[1.2rem] 2xl:leading-[1.5rem] font-semibold",
  h4: "lg:text-[20px] min-[1440px]:text-[24px] font-medium lg:leading-[30.15px] min-[1440px]:leading-[34.15px] tracking-[-2px]",
  h5: "",
  h6: "",
};

const Heading = forwardRef(
  ({ type = "h6", variant = "", id, extraStyles = "", children }, ref) => {
    const key = variant ? `${type}.${variant}` : type;
    const Tag = headingStyles[key] ? type : "h6";
    const classes = `${
      headingStyles[key] || headingStyles[type]
    } ${extraStyles}`.trim();

    return (
      <Tag ref={ref} id={id} className={classes}>
        {children}
      </Tag>
    );
  }
);

export default Heading;
