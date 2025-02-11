import Heading from "@/components/Heading";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";
import User from "../icons/User";
import Password from "../icons/Password";
import { useState } from "react";
import Loader from "@/components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { useShallow } from "zustand/react/shallow";
import { onSubmitLogin } from "../utils/authMethods";

const Form = () => {
  const { user, token, handlelogin, handleuser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      token: state.token,
      handlelogin: state.handlelogin,
      handleuser: state.handleuser,
    }))
  );
  const [loading, setLoading] = useState({});
  const [errorLogin, setErrorLogin] = useState(null);
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
  const navigate = useNavigate();

  const onLogin = (data) => {
    console.log({ data });
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
                })}
                errorId={errors.email}
              />

              <InputText
                icon={<Password width={16} height={16} styles={""} />}
                type={"password"}
                text={"Contraseña"}
                placeholder={"Escribe la contraseña registrada"}
                name={"password"}
                id={"password"}
                mode={"login"}
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
                mode={"form"}
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
