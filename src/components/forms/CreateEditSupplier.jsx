import { createSupplier, updateSupplier } from "../../utils/supplierMethods";
import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { useForm } from "react-hook-form";
import { formValidate } from "@/utils/formValidate";

import Button from "@/components/Button";
import InputText from "@/components/InputText";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";

import Loader from "@/components/Loader";
import Letter from "@/icons/Letter";
import Phone from "@/icons/Phone";
import Email from "@/icons/Email";
import Website from "@/icons/Website";
import Location from "@/icons/Location";
import Map from "@/icons/Map";
import City from "@/icons/City";
import Zip from "@/icons/Zip";
import { useSupplierStore } from "@/store/supplier.store";

const CreateEditSupplier = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const data = useToggleStore((state) => state.data);
  const supplierList = useSupplierStore((state) => state.supplierList);
  const handleSupplierList = useSupplierStore(
    (state) => state.handleSupplierList
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
      phone: "",
      email: "",
      website: "",
      address1: "",
      address2: "",
      city: "",
      province: "",
      province_code: "",
      country: "",
      country_code: "",
      zip: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onRegister = (data) => {
    createSupplier({
      data,
      token,
      user: user.id,
      setLoading,
      setErrorAxios,
      handleToggleModal,
      toggleModal,
      supplierList,
      handleSupplierList,
    });
  };

  const onEdit = ({
    name,
    phone,
    email,
    website,
    address1,
    address2,
    city,
    province,
    province_code,
    country,
    country_code,
    zip,
  }) => {
    updateSupplier({
      data: {
        name,
        phone,
        email,
        website,
        address1,
        address2,
        city,
        province,
        province_code,
        country,
        country_code,
        zip,
      },
      token,
      id: data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      handleToggleModal,
      toggleModal,
      supplierList,
      handleSupplierList,
    });
  };

  useEffect(() => {
    if (loading.createSupplier || loading.editSupplier || !toggleModal) {
      reset({
        name: "",
        phone: "",
        email: "",
        website: "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        province_code: "",
        country: "",
        country_code: "",
        zip: "",
      });
    }
  }, [loading.createSupplier, loading.editSupplier, toggleModal]);

  return (
    <section className="w-full h-full z-10 p-10">
      <Heading type="h3" variant="" className="font-normal">
        <span>
          {modalType === "edit-supplier"
            ? "Actualizar proveedor"
            : "Registrar proveedor"}
        </span>
      </Heading>
      <article className="w-full h-full pt-10 px-[40px]">
        <form
          onSubmit={
            modalType === "edit-supplier"
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
                modalType === "edit-supplier"
                  ? data.name
                  : "Escribe el nombre del proveedor"
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
              icon={<Phone width={16} height={16} styles={""} />}
              type={"text"}
              text={"Teléfono"}
              placeholder={
                modalType === "edit-supplier"
                  ? data.contactInfo.phone
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
              icon={<Email width={16} height={16} styles={""} />}
              type={"email"}
              text={"Correo electrónico"}
              placeholder={
                modalType === "edit-supplier"
                  ? data.contactInfo.email
                  : "Escribe el correo electrónico"
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
            <InputText
              icon={<Website width={16} height={16} styles={""} />}
              type={"text"}
              text={"Sitio Web"}
              placeholder={
                modalType === "edit-supplier"
                  ? data.contactInfo.website
                  : "Escribe la dirección del sitio web"
              }
              name={"website"}
              id={"website"}
              error={errors.website && "error-input"}
              {...register("website", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.website}
            />
          </div>
          <div className="w-full">
            <InputText
              icon={<Location width={16} height={16} styles={""} />}
              type={"text"}
              text={"Dirección 1"}
              placeholder={
                modalType === "edit-supplier"
                  ? data.address.address1
                  : "Escribe linea de dirección 1"
              }
              name={"address1"}
              id={"address1"}
              error={errors.address1 && "error-input"}
              {...register("address1", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.address1}
            />
          </div>
          <div className="w-full">
            <InputText
              icon={<Location width={16} height={16} styles={""} />}
              type={"text"}
              text={"Dirección 2"}
              placeholder={
                modalType === "edit-supplier"
                  ? data.address.address2
                  : "Escribe linea de dirección 2"
              }
              name={"address2"}
              id={"address2"}
              error={errors.address2 && "error-input"}
              {...register("address2", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.address2}
            />
          </div>
          <div className="w-full">
            <InputText
              icon={<City width={16} height={16} styles={""} />}
              type={"text"}
              text={"Ciudad"}
              placeholder={
                modalType === "edit-supplier"
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
                modalType === "edit-supplier"
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
                modalType === "edit-supplier"
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

          <div className="w-full">
            <InputText
              icon={<Zip width={16} height={16} styles={""} />}
              type={"text"}
              text={"código postal"}
              placeholder={
                modalType === "edit-supplier"
                  ? data.address.zip
                  : "Escribe el código postal"
              }
              name={"zip"}
              id={"zip"}
              error={errors.zip && "error-input"}
              {...register("zip", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.zip}
            />
          </div>

          <div className="w-full col-span-1 md:col-span-2 flex justify-start items-start gap-10">
            <Button
              text={modalType === "edit-supplier" ? "Actualizar" : "Registrar"}
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

export default CreateEditSupplier;
