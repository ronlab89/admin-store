import React from "react";
import Form from "../components/Form";
import Heading from "@/components/Heading";
import Logo from "@/components/Logo";

const Login = () => {
  return (
    <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 place-items-center z-10">
      <article className="w-full h-full flex flex-col justify-start items-center py-[100px]">
        <div className="flex justify-center items-end z-10">
          <Logo
            width={100}
            height={100}
            styles="text-teal-600 dark:text-teal-400"
          />
          <Heading
            type="h1"
            variant="legal"
            className="flex justify-between items-center"
          >
            <span className="">Admin Store</span>
          </Heading>
        </div>
        <div className="hidden">
          <img
            src="/draw.webp"
            alt="Draw"
            width={600}
            height={500}
            className="z-30 object-cover"
          />
        </div>
      </article>
      <Form />
    </section>
  );
};

export default Login;
