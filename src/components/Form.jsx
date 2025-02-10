import Heading from "@/components/Heading";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";
import User from "../icons/User";
import Password from "../icons/Password";
import { useState } from "react";
import Loader from "@/components/Loader";

const Form = () => {
  const [loading, setLoading] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      note: "",
      email: "",
      password: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onLogin = (data) => {
    console.log({ data });
    // onSubmitLogin(
    //   data,
    //   setLoading,
    //   navigate,
    //   setErrorLogin,
    //   handlelogin,
    //   handleuser
    // );
  };

  return (
    <section className="w-full h-full z-10">
      {loading.login ? <Loader type={""} /> : null}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full h-[50%] bg-slate-200 rounded-[20px] shadow-sm dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-slate-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading
              type="h2"
              variant=""
              className="flex justify-between items-center"
            >
              <span>Inicia sesión</span>
            </Heading>
            <form
              onSubmit={handleSubmit(onLogin)}
              className="space-y-4 md:space-y-6"
              noValidate
            >
              <InputText
                icon={<User width={16} height={16} styles={""} />}
                type={"text"}
                text={"Usuario"}
                placeholder={"Escribe tu correo electrónico"}
                name={"name"}
                id={"name"}
                error={errors.name && "error-input"}
                {...register("name", {
                  required,
                  validate: validateTrim,
                })}
                errorId={errors.name}
              />

              <InputText
                icon={<Password width={16} height={16} styles={""} />}
                type={"password"}
                text={"Contraseña"}
                placeholder={"Escribe la contraseña registrada"}
                name={"password"}
                id={"password"}
                error={errors.password && "error-input"}
                {...register("password", {
                  required,
                  validate: validateTrim,
                })}
                errorId={errors.password}
              />
              <Button
                text={"Continuar"}
                icon={""}
                type={"submit"}
                styles={"cursor-pointer"}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
