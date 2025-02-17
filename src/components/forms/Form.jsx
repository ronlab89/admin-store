import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";

import { formValidate } from "@/utils/formValidate";
import { onSubmitLogin } from "@/utils/authMethods";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
const Loader = lazy(() => import("@/components/Loader"));

import User from "@/icons/User";
import Password from "@/icons/Password";

const Form = () => {
  const handlelogin = useAuthStore((state) => state.handlelogin);
  const handleuser = useAuthStore((state) => state.handleuser);
  const toggleShow = useToggleStore((state) => state.toggleShow);

  const [loading, setLoading] = useState({});
  const [errorLogin, setErrorLogin] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();
  const navigate = useNavigate();

  const onLogin = (data) => {
    onSubmitLogin(
      data,
      setLoading,
      navigate,
      setErrorLogin,
      handlelogin,
      handleuser
    );
  };

  return (
    <section className="w-full h-full z-10">
      {loading.login ? (
        <Suspense fallback={""}>
          <Loader type={""} />
        </Suspense>
      ) : null}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full h-[50%] bg-slate-200 rounded-[.5rem] shadow-sm dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-slate-800 dark:border-gray-700">
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
                type={"email"}
                text={"Usuario"}
                placeholder={"Escribe tu correo electrónico"}
                name={"email"}
                id={"email"}
                mode={"login"}
                error={errors.email && "error-input"}
                {...register("email", {
                  required,
                  validate: validateTrim,
                  pattern: patternEmail,
                })}
                errorId={errors.email}
              />
              <InputText
                icon={<Password width={16} height={16} styles={""} />}
                type={
                  toggleShow.status && toggleShow.id === "password"
                    ? "text"
                    : "password"
                }
                text={"Contraseña"}
                placeholder={"Escribe la contraseña registrada"}
                name={"password"}
                id={"password"}
                mode={"login"}
                error={errors.password && "error-input"}
                {...register("password", {
                  required,
                  validate: validateTrim,
                  minLength: minLength,
                })}
                errorId={errors.password}
              />
              <Button
                text={"Continuar"}
                icon={""}
                type={"submit"}
                styles={"cursor-pointer"}
                mode={"form"}
                variant={""}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
