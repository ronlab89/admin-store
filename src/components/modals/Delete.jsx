import React, { useState } from "react";
import Trash from "@/icons/Trash";
import { useShallow } from "zustand/shallow";
import { useToggleStore } from "@/store/toggle.store";
import Heading from "@/components/Heading";
import { deleteUser } from "../../utils/authMethods";
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import Loader from "@/components/Loader";
import { useSupplierStore } from "@/store/supplier.store";
import { deleteSupplier } from "../../utils/supplierMethods";
import { deleteCustomer } from "../../utils/customerMethods";
import { useCustomerStore } from "@/store/customer.store";
import { deleteProductCategory } from "../../utils/productCategoryMethods";
import { useProductCategoryStore } from "@/store/productCategory";
import { deleteProduct } from "../../utils/productMethods";
import { useProductStore } from "../../store/product.store";
import { deletePaymentMethod } from "../../utils/paymentMethods";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { deleteExpenseCategory } from "../../utils/expenseCategoryMethods";
import { useExpenseCategoryStore } from "@/store/expenseCategory.store";

const Delete = () => {
  const token = useAuthStore((state) => state.token);
  const userList = useUserStore((state) => state.userList);
  const handleUserList = useUserStore((state) => state.handleUserList);
  const { toggleModalDelete, handleToggleModalDelete, modalType, data } =
    useToggleStore(
      useShallow((state) => ({
        toggleModalDelete: state.toggleModalDelete,
        handleToggleModalDelete: state.handleToggleModalDelete,
        modalType: state.modalType,
        data: state.data,
      }))
    );
  const supplierList = useSupplierStore((state) => state.supplierList);
  const handleSupplierList = useSupplierStore(
    (state) => state.handleSupplierList
  );
  const customerList = useCustomerStore((state) => state.customerList);
  const handleCustomerList = useCustomerStore(
    (state) => state.handleCustomerList
  );
  const productCategoryList = useProductCategoryStore(
    (state) => state.productCategoryList
  );
  const handleProductCategoryList = useProductCategoryStore(
    (state) => state.handleProductCategoryList
  );
  const productList = useProductStore((state) => state.productList);
  const handleProductList = useProductStore((state) => state.handleProductList);
  const paymentMethodList = usePaymentMethodStore(
    (state) => state.paymentMethodList
  );
  const handlePaymentMethodList = usePaymentMethodStore(
    (state) => state.handlePaymentMethodList
  );
  const expenseCategoryList = useExpenseCategoryStore(
    (state) => state.expenseCategoryList
  );
  const handleExpenseCategoryList = useExpenseCategoryStore(
    (state) => state.handleExpenseCategoryList
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  const handleDelete = (type) => {
    if (type === "delete") {
      deleteUser({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        userList,
        handleUserList,
      });
    }
    if (modalType === "delete-supplier") {
      deleteSupplier({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        supplierList,
        handleSupplierList,
      });
    }
    if (modalType === "delete-customer") {
      deleteCustomer({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        customerList,
        handleCustomerList,
      });
    }
    if (modalType === "delete-product-category") {
      deleteProductCategory({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        productCategoryList,
        handleProductCategoryList,
      });
    }
    if (modalType === "delete-product") {
      deleteProduct({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        productList,
        handleProductList,
      });
    }
    if (modalType === "delete-payment-method") {
      deletePaymentMethod({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        paymentMethodList,
        handlePaymentMethodList,
      });
    }
    if (modalType === "delete-expense-category") {
      deleteExpenseCategory({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        expenseCategoryList,
        handleExpenseCategoryList,
      });
    }
  };

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        toggleModalDelete ? "" : "hidden"
      } overflow-hidden fixed top-0 right-0 left-0 mx-auto z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-slate-200 rounded-[20px] shadow-md dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-8 border-b-0 rounded-t dark:border-slate-800 border-slate-200">
            <span className="w-8 h-8 flex justify-center items-center bg-red-100 rounded-[20px]">
              <Trash
                width={20}
                height={20}
                styles={"text-red-600 dark:text-red-400"}
              />
            </span>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white sr-only">
              Static modal
            </h3>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-4 px-8 space-y-4 text-sm">
            <Heading type="h3" variant="" className="font-normal">
              <span>{`¿Estás seguro de que quieres eliminar ${
                modalType === "delete"
                  ? "a este empleado"
                  : modalType === "delete-product"
                  ? "a este producto"
                  : modalType === "delete-supplier"
                  ? "a este proveedor"
                  : modalType === "delete-customer"
                  ? "a este cliente"
                  : modalType === "delete-product-category"
                  ? "a esta categoria de producto"
                  : modalType === "delete-payment-method"
                  ? "a este método de pago"
                  : modalType === "delete-expense-category"
                  ? "a esta categoria de gastos"
                  : ""
              }?`}</span>
            </Heading>
            <p className="text-base leading-0 text-slate-800 dark:text-slate-200 mb-10">
              Esta acción no se puede deshacer.
            </p>
            <p className="leading-0 text-slate-800 dark:text-slate-200 flex justify-start items-center gap-2">
              <span className="font-medium">
                {" "}
                {modalType === "delete-product-category" ||
                modalType === "delete-expense-category"
                  ? "Categoria"
                  : modalType === "delete-payment-method"
                  ? "Método de pago"
                  : "Nombre"}
                :{" "}
              </span>
              <span>
                {data?.name} {data?.surname}
              </span>
            </p>
            <p className="leading-0 text-slate-800 dark:text-slate-200 flex justify-start items-center gap-2">
              <span className="font-medium">
                {modalType === "delete-product-category" ||
                modalType === "delete-expense-category" ||
                modalType === "delete-product" ||
                modalType === "delete-payment-method"
                  ? "Descripción:"
                  : "Correo electrónico:"}
              </span>
              <span>
                {modalType === "delete" || modalType === "delete-customer"
                  ? data?.email
                  : modalType === "delete-product-category" ||
                    modalType === "delete-expense-category" ||
                    modalType === "delete-product" ||
                    modalType === "delete-payment-method"
                  ? data?.description
                  : data?.contactInfo?.email}
              </span>
            </p>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-end items-end gap-4 p-8 border-t-0 border-slate-200 rounded-b dark:border-slate-800">
            <button
              data-modal-hide="static-modal"
              type="button"
              onClick={() => handleToggleModalDelete(!toggleModalDelete)}
              className="py-1.5 px-5 ms-3 text-sm font-medium text-slate-800 border-0 focus:outline-none !bg-slate-100 rounded-md border-slate-100 hover:!bg-slate-300 hover:text-slate-700 focus:z-10 focus:ring-0 focus:ring-gray-100 dark:focus:ring-gray-700 dark:!bg-slate-900 dark:text-slate-200 dark:border-slate-800 dark:hover:text-slate-200 dark:hover:!bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              onClick={() => handleDelete(modalType)}
              className="text-slate-100 dark:text-slate-200 border-0 !bg-red-500 hover:!bg-red-600 focus:ring-0 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-1.5 text-center dark:!bg-red-600 dark:hover:!bg-red-400 dark:focus:ring-red-800 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {loading.deleteUser ||
      loading.deleteProduct ||
      loading.deleteSupplier ||
      loading.deleteCustomer ||
      loading.deleteProductCategory ? (
        <Loader type={""} />
      ) : null}
    </div>
  );
};

export default Delete;
