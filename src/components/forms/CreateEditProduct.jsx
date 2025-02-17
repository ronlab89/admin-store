import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useProductCategoryStore } from "@/store/productCategory.store";
import { useSupplierStore } from "@/store/supplier.store";
import { useProductStore } from "@/store/product.store";

import { formValidate } from "@/utils/formValidate";
import { createProduct, updateProduct } from "@/utils/productMethods";

import Heading from "@/components/Heading";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import InputSelect from "@/components/InputSelect";
import Loader from "@/components/Loader";

import Letter from "@/icons/Letter";
import Sale from "@/icons/Sale";

const CreateEditProduct = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const modalType = useToggleStore((state) => state.modalType);
  const data = useToggleStore((state) => state.data);
  const supplierList = useSupplierStore((state) => state.supplierList);
  const productCategoryList = useProductCategoryStore(
    (state) => state.productCategoryList
  );
  const productList = useProductStore((state) => state.productList);
  const handleProductList = useProductStore((state) => state.handleProductList);

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
      description: "",
      price: "",
      category: "",
      supplier: "",
    },
  });

  const { required, validateTrim, minLength, patternEmail } = formValidate();

  const onRegister = (data) => {
    createProduct({
      data,
      token,
      user: user.id,
      setLoading,
      setErrorAxios,
      handleToggleModal,
      toggleModal,
      productList,
      handleProductList,
    });
  };

  const onEdit = ({ name, description, price, category, supplier }) => {
    updateProduct({
      data: { name, description, price, category, supplier },
      token,
      id: data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      productList,
      handleProductList,
      handleToggleModal,
      toggleModal,
    });
  };

  useEffect(() => {
    if (loading.createProduct || loading.editProduct || !toggleModal) {
      reset({
        name: "",
        description: "",
        price: "",
        category: "",
        supplier: "",
      });
    }
  }, [loading.createProduct, loading.editProduct, toggleModal]);

  return (
    <section className="w-full h-full z-10 p-10">
      <Heading type="h3" variant="" className="font-normal">
        <span>
          {modalType === "edit-product"
            ? "Actualizar producto"
            : "Registrar producto"}
        </span>
      </Heading>
      <article className="w-full min-h-screen h-screen max-h-full pt-5 min-[90rem]:px-[40px] overflow-x-hidden overflow-y-auto pb-[200px]">
        <form
          onSubmit={
            modalType === "edit-product"
              ? handleSubmit(onEdit)
              : handleSubmit(onRegister)
          }
          className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-3 min-[90rem]:gap-4"
          noValidate
        >
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full col-span-1">
            <InputText
              icon={<Letter width={16} height={16} styles={""} />}
              type={"text"}
              text={"Nombre"}
              placeholder={
                modalType === "edit-product" ? data.name : "Escribe el nombre"
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
          <div className="w-[90%] xl:w-[95%] min-[90rem]:w-[100%] 2xl:w-full col-span-1 md:col-span-2">
            <InputText
              icon={<Letter width={16} height={16} styles={""} />}
              type={"text"}
              text={"Description"}
              placeholder={
                modalType === "edit-product"
                  ? data.description
                  : "Escribe la descripción"
              }
              name={"description"}
              id={"description"}
              error={errors.description && "error-input"}
              {...register("description", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.description}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full col-span-1">
            <InputText
              icon={<Sale width={16} height={16} styles={""} />}
              type={"number"}
              text={"Precio Unitario"}
              placeholder={
                modalType === "edit-product"
                  ? data.price
                  : "Escribe el precio unitario"
              }
              name={"price"}
              id={"price"}
              error={errors.price && "error-input"}
              {...register("price", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.price}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full col-span-1">
            <InputSelect
              icon={""}
              id={"category"}
              name={"category"}
              label={"Categoría"}
              divStyles={"min-w-[100%]"}
              defaultOption={
                modalType === "edit-product"
                  ? data.category.name
                  : "Seleccione la categoría"
              }
              options={productCategoryList?.map((item) => ({
                value: item?._id,
                name: item?.name,
              }))}
              error={errors.category && "error-select"}
              {...register("category", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.category}
            />
          </div>
          <div className="w-[80%] xl:w-[90%] min-[90rem]:w-[95%] 2xl:w-full col-span-1">
            <InputSelect
              icon={""}
              id={"supplier"}
              name={"supplier"}
              label={"Proveedor"}
              divStyles={"min-w-[100%]"}
              defaultOption={
                modalType === "edit-product"
                  ? data.supplier.name
                  : "Seleccione el proveedor"
              }
              options={supplierList?.map((item) => ({
                value: item?._id,
                name: item?.name,
              }))}
              error={errors.supplier && "error-select"}
              {...register("supplier", {
                required,
                validate: validateTrim,
              })}
              errorId={errors.supplier}
            />
          </div>

          <div className="w-full col-span-1 md:col-span-2 flex justify-start items-start lg:ml-[50px] xl:ml-[35px] min-[90rem]:ml-[20px] 2xl:ml-0 mt-5">
            <Button
              text={modalType === "edit-product" ? "Actualizar" : "Registrar"}
              icon={""}
              type={"submit"}
              styles={"cursor-pointer"}
              mode={"form"}
              variant={""}
            />
          </div>
        </form>
      </article>
      {loading.createProduct || loading.editProduct ? (
        <Loader type={""} />
      ) : null}
    </section>
  );
};

export default CreateEditProduct;
