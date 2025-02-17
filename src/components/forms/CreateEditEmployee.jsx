import { lazy, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useUserStore } from "@/store/user.store";

import { formValidate } from "@/utils/formValidate";
import { onSubmitEdit, onSubmitRegister } from "@/utils/authMethods";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
const Loader = lazy(() => import("@/components/Loader"));

import Password from "@/icons/Password";
import Letter from "@/icons/Letter";
import Email from "@/icons/Email";
import Location from "@/icons/Location";
import Map from "@/icons/Map";
import City from "@/icons/City";
import Phone from "@/icons/Phone";

const CreateEditEmployee = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const handleuser = useAuthStore((state) => state.handleuser);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const data = useToggleStore((state) => state.data);
  const userList = useUserStore((state) => state.userList);
  const handleUserList = useUserStore((state) => state.handleUserList);
  const handleDataProfile = useUserStore((state) => state.handleDataProfile);
  const toggleShow = useToggleStore((state) => state.toggleShow);

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
      phone: "",
      addressline: "",
      city: "",
      province: "",
      country: "",
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

  const onEdit = ({
    name,
    surname,
    email,
    phone,
    addressline,
    city,
    province,
    country,
    role,
  }) => {
    onSubmitEdit({
      data: {
        name,
        surname,
        email,
        phone,
        addressline,
        city,
        province,
        country,
        role,
      },
      token,
      id: data._id ? data._id : data.id,
      user: user.id,
      setLoading,
      setErrorAxios,
      userList,
      handleUserList,
      handleToggleModal,
      toggleModal,
      type: data.type,
      handleuser,
      handleDataProfile,
    });
  };

  useEffect(() => {
    if (loading.registerUser || loading.editUser || !toggleModal) {
      reset({
        name: "",
        surname: "",
        email: "",
        phone: "",
        addressline: "",
        city: "",
        province: "",
        country: "",
        role: "",
        password: "",
        repassword: "",
      });
    }
  }, [loading.registerUser, loading.editUser, toggleModal]);

  return (
    <section className="w-full h-full z-10 p-5 min-[90rem]:p-10">
      <Heading type="h3" variant="" className="font-normal">
        <span>
          {modalType === "edit" ? "Actualizar empleado" : "Registrar empleado"}
        </span>
      </Heading>
      <article className="w-full min-h-screen h-screen max-h-full pt-5 min-[90rem]:px-[40px] overflow-x-hidden overflow-y-auto pb-[200px]">
        <form
          onSubmit={
            modalType === "edit"
              ? handleSubmit(onEdit)
              : handleSubmit(onRegister)
          }
          className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-3 min-[90rem]:gap-4"
          noValidate
        >
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Letter width={16} height={16} styles={""} />}
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
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Letter width={16} height={16} styles={""} />}
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
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Email width={16} height={16} styles={""} />}
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
                pattern: patternEmail,
              })}
              errorId={errors.email}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Phone width={16} height={16} styles={""} />}
              type={"text"}
              text={"Teléfono"}
              placeholder={
                modalType === "edit-customer"
                  ? data.phone
                  : "Escribe el teléfono"
              }
              name={"phone"}
              id={"phone"}
              error={errors.phone && "error-input"}
              {...register("phone", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.phone}
            />
          </div>
          {modalType === "edit" ? null : (
            <>
              <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
                <InputText
                  icon={<Password width={16} height={16} styles={""} />}
                  type={
                    toggleShow.status && toggleShow.id === "password"
                      ? "text"
                      : "password"
                  }
                  text={"Contraseña"}
                  placeholder={"Crea una contraseña segura"}
                  name={"password"}
                  id={"password"}
                  error={errors.password && "error-input"}
                  {...register("password", {
                    required,
                    validate: validateTrim,
                    minLength: minLength,
                  })}
                  errorId={errors.password}
                />
              </div>
              <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
                <InputText
                  icon={<Password width={16} height={16} styles={""} />}
                  type={
                    toggleShow.status && toggleShow.id === "repassword"
                      ? "text"
                      : "password"
                  }
                  text={"Repite contraseña"}
                  placeholder={"Vuelve a escribir la contraseña"}
                  name={"repassword"}
                  id={"repassword"}
                  error={errors.repassword && "error-input"}
                  {...register("repassword", {
                    required,
                    validate: validateTrim,
                    minLength: minLength,
                  })}
                  errorId={errors.repassword}
                />
              </div>
            </>
          )}
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputSelect
              icon={""}
              id={"role"}
              name={"role"}
              label={"Cargo"}
              divStyles={"min-w-[100%]"}
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
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Location width={16} height={16} styles={""} />}
              type={"text"}
              text={"Dirección 1"}
              placeholder={
                modalType === "edit-customer"
                  ? data.address.addressline
                  : "Escribe linea de dirección"
              }
              name={"addressline"}
              id={"addressline"}
              error={errors.addressline && "error-input"}
              {...register("addressline", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.addressline}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<City width={16} height={16} styles={""} />}
              type={"text"}
              text={"Ciudad"}
              placeholder={
                modalType === "edit-customer"
                  ? data.address.city
                  : "Escribe la ciudad"
              }
              name={"city"}
              id={"city"}
              error={errors.city && "error-input"}
              {...register("city", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.city}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Map width={16} height={16} styles={""} />}
              type={"text"}
              text={"Estado"}
              placeholder={
                modalType === "edit-customer"
                  ? data.address.province
                  : "Escribe el estado"
              }
              name={"province"}
              id={"province"}
              error={errors.province && "error-input"}
              {...register("province", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.province}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full">
            <InputText
              icon={<Map width={16} height={16} styles={""} />}
              type={"text"}
              text={"País"}
              placeholder={
                modalType === "edit-customer"
                  ? data.address.country
                  : "Escribe el país"
              }
              name={"country"}
              id={"country"}
              error={errors.country && "error-input"}
              {...register("country", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.country}
            />
          </div>
          <div className="w-full col-span-1 md:col-span-2 flex justify-start items-start lg:ml-[85px] xl:ml-[55px] min-[90rem]:ml-[30px] 2xl:ml-0 mt-5">
            <Button
              text={modalType === "edit" ? "Actualizar" : "Registrar"}
              icon={""}
              type={"submit"}
              styles={"cursor-pointer"}
              mode={"form"}
              variant={""}
            />
          </div>
        </form>
      </article>
      {loading.registerUser || loading.editUser ? (
        <Suspense fallback={""}>
          <Loader type={""} />
        </Suspense>
      ) : null}
    </section>
  );
};

export default CreateEditEmployee;
