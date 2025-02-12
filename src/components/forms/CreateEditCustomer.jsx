import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";

import Button from "@/components/Button";
import InputText from "@/components/InputText";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useCustomerStore } from "@/store/customer.store";

import Loader from "@/components/Loader";
import Letter from "@/icons/Letter";
import Phone from "@/icons/Phone";
import Email from "@/icons/Email";
import Location from "@/icons/Location";
import Map from "@/icons/Map";
import City from "@/icons/City";
import { createCustomer, updateCustomer } from "../../utils/customerMethods";

const CreateEditCustomer = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const data = useToggleStore((state) => state.data);
  const customerList = useCustomerStore((state) => state.customerList);
  const handleCustomerList = useCustomerStore(
    (state) => state.handleCustomerList
  );
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
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onRegister = (data) => {
    createCustomer({
      data,
      token,
      user: user.id,
      setLoading,
      setErrorAxios,
      handleToggleModal,
      toggleModal,
      customerList,
      handleCustomerList,
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
  }) => {
    updateCustomer({
      data: {
        name,
        surname,
        email,
        phone,
        addressline,
        city,
        province,
        country,
      },
      token,
      id: data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      handleToggleModal,
      toggleModal,
      customerList,
      handleCustomerList,
    });
  };

  useEffect(() => {
    if (loading.createCustomer || loading.editCustomer || !toggleModal) {
      reset({
        name: "",
        surname: "",
        email: "",
        phone: "",
        addressline: "",
        city: "",
        province: "",
        country: "",
      });
    }
  }, [loading.createCustomer, loading.editCustomer, toggleModal]);

  return (
    <section className="w-full h-full z-10 p-10">
      <Heading type="h3" variant="" className="font-normal">
        <span>
          {modalType === "edit-customer"
            ? "Actualizar cliente"
            : "Registrar cliente"}
        </span>
      </Heading>
      <article className="w-full h-full pt-10 px-[40px]">
        <form
          onSubmit={
            modalType === "edit-customer"
              ? handleSubmit(onEdit)
              : handleSubmit(onRegister)
          }
          className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-5"
          noValidate
        >
          <div className="w-full">
            <InputText
              icon={<Letter width={16} height={16} styles={""} />}
              type={"text"}
              text={"Nombre"}
              placeholder={
                modalType === "edit-customer"
                  ? data.name
                  : "Escribe el nombre del cliente"
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
              icon={<Letter width={16} height={16} styles={""} />}
              type={"text"}
              text={"Apellido"}
              placeholder={
                modalType === "edit-customer"
                  ? data.surname
                  : "Escribe el apellido del cliente"
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
              icon={<Email width={16} height={16} styles={""} />}
              type={"email"}
              text={"Correo electrónico"}
              placeholder={
                modalType === "edit-customer"
                  ? data.email
                  : "Escribe el correo electrónico"
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
          <div className="w-full">
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
          <div className="w-full">
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
          <div className="w-full">
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
          <div className="w-full">
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
          <div className="w-full">
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
          <div className="w-full col-span-1 md:col-span-2 flex justify-start items-start gap-10">
            <Button
              text={modalType === "edit-customer" ? "Actualizar" : "Registrar"}
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

export default CreateEditCustomer;
