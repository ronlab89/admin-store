import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";
import User from "@/icons/User";
import Password from "@/icons/Password";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import { onSubmitEdit, onSubmitRegister } from "../../utils/authMethods";
import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useUserStore } from "@/store/user.store";
import Loader from "@/components/Loader";

const CreateEditEmployee = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const data = useToggleStore((state) => state.data);
  const userList = useUserStore((state) => state.userList);
  const handleUserList = useUserStore((state) => state.handleUserList);
  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      role: "",
      password: "",
      repassword: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onRegister = (data) => {
    onSubmitRegister({
      data,
      token,
      user: user.id,
      setLoading,
      setErrorAxios,
      handleToggleModal,
      toggleModal,
      userList,
      handleUserList,
    });
  };

  const onEdit = ({ name, surname, email, role }) => {
    onSubmitEdit({
      data: { name, surname, email, role },
      token,
      id: data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      userList,
      handleUserList,
      handleToggleModal,
      toggleModal,
    });
  };

  useEffect(() => {
    if (loading.registerUser || loading.editUser || !toggleModal) {
      reset({
        name: "",
        surname: "",
        email: "",
        role: "",
        password: "",
        repassword: "",
      });
    }
  }, [loading.registerUser, loading.editUser, toggleModal]);

  return (
    <section className="w-full h-full z-10 p-10">
      <Heading type="h3" variant="" className="font-normal">
        <span>
          {modalType === "edit" ? "Actualizar empleado" : "Registrar empleado"}
        </span>
      </Heading>
      <article className="w-full h-full pt-20 px-[40px]">
        <form
          onSubmit={
            modalType === "edit"
              ? handleSubmit(onEdit)
              : handleSubmit(onRegister)
          }
          className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10"
          noValidate
        >
          <div className="w-full">
            <InputText
              icon={<User width={16} height={16} styles={""} />}
              type={"text"}
              text={"Nombre"}
              placeholder={
                modalType === "edit" ? data.name : "Escribe el nombre"
              }
              name={"name"}
              id={"name"}
              error={errors.name && "error-input"}
              {...register("name", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.name}
            />
          </div>
          <div className="w-full">
            <InputText
              icon={<Password width={16} height={16} styles={""} />}
              type={"text"}
              text={"Apellido"}
              placeholder={
                modalType === "edit" ? data.surname : "Escribe el apellido"
              }
              name={"surname"}
              id={"surname"}
              error={errors.surname && "error-input"}
              {...register("surname", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.surname}
            />
          </div>
          <div className="w-full">
            <InputText
              icon={<User width={16} height={16} styles={""} />}
              type={"email"}
              text={"Correo electrónico"}
              placeholder={
                modalType === "edit"
                  ? data.email
                  : "Escribe tu correo electrónico"
              }
              name={"email"}
              id={"email"}
              error={errors.email && "error-input"}
              {...register("email", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.email}
            />
          </div>
          <div className="w-full">
            <InputSelect
              icon={""}
              id={"role"}
              name={"role"}
              label={"Cargo"}
              defaultOption={
                modalType === "edit" ? data.role : "Seleccione el role"
              }
              options={[
                { value: "administrador", name: "Administrador" },
                { value: "supervisor", name: "Supervisor" },
                { value: "empleado", name: "Empleado" },
              ]}
              error={errors.role && "error-select"}
              {...register("role", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.role}
            />
          </div>
          {modalType === "edit" ? null : (
            <>
              <div className="w-full">
                <InputText
                  icon={<User width={16} height={16} styles={""} />}
                  type={"password"}
                  text={"Contraseña"}
                  placeholder={"Crea una contraseña segura"}
                  name={"password"}
                  id={"password"}
                  error={errors.password && "error-input"}
                  {...register("password", {
                    required,
                    validate: validateTrim,
                  })}
                  errorId={errors.password}
                />
              </div>
              <div className="w-full">
                <InputText
                  icon={<Password width={16} height={16} styles={""} />}
                  type={"password"}
                  text={"Repite contraseña"}
                  placeholder={"Vuelve a escribir la contraseña anterior"}
                  name={"repassword"}
                  id={"repassword"}
                  error={errors.repassword && "error-input"}
                  {...register("repassword", {
                    required,
                    validate: validateTrim,
                  })}
                  errorId={errors.repassword}
                />
              </div>
            </>
          )}
          <div className="w-full col-span-1 md:col-span-2 flex justify-start items-start gap-10">
            <Button
              text={modalType === "edit" ? "Actualizar" : "Registrar"}
              icon={""}
              type={"submit"}
              styles={"cursor-pointer"}
              mode={"form"}
            />
          </div>
        </form>
      </article>
      {loading.registerUser || loading.editUser ? <Loader type={""} /> : null}
    </section>
  );
};

export default CreateEditEmployee;
