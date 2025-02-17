import Form from "@/components/forms/Form";
import Heading from "@/components/Heading";
import Logo from "@/components/Logo";
import Draw from "@/icons/Draw";

const Login = () => {
  return (
    <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 place-items-center z-10">
      <article className="w-full h-full flex flex-col justify-start items-center py-[50px]">
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
        <div className="z-50 text-slate-800 dark:text-slate-700 pt-[50px]">
          <Draw
            width={600}
            height={500}
            styles={"w-[40vw] z-50 object-cover"}
          />
        </div>
      </article>
      <Form />
    </section>
  );
};

export default Login;
