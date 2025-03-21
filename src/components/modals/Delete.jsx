import { useState } from "react";

import { useToggleStore } from "@/store/toggle.store";
import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import { useSupplierStore } from "@/store/supplier.store";
import { useCustomerStore } from "@/store/customer.store";
import { useProductCategoryStore } from "@/store/productCategory.store";
import { useProductStore } from "@/store/product.store";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { useExpenseCategoryStore } from "@/store/expenseCategory.store";
import { useSaleStore } from "@/store/sale.store";
import { usePurchaseStore } from "@/store/purchase.store";

import { deleteUser } from "@/utils/authMethods";
import { deleteSupplier } from "@/utils/supplierMethods";
import { deleteCustomer } from "@/utils/customerMethods";
import { deleteProductCategory } from "@/utils/productCategoryMethods";
import { deleteProduct } from "@/utils/productMethods";
import { deletePaymentMethod } from "@/utils/paymentMethods";
import { deleteExpenseCategory } from "@/utils/expenseCategoryMethods";
import { formatterco } from "@/utils/formatter";
import { deletePurchase } from "@/utils/PurchaseMethod";
import { deleteSale } from "@/utils/saleMethods";

import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Button from "@/components/Button";

import Trash from "@/icons/Trash";

const Delete = () => {
  const token = useAuthStore((state) => state.token);
  const userList = useUserStore((state) => state.userList);
  const handleUserList = useUserStore((state) => state.handleUserList);
  const toggleModalDelete = useToggleStore((state) => state.toggleModalDelete);
  const handleToggleModalDelete = useToggleStore(
    (state) => state.handleToggleModalDelete
  );
  const modalType = useToggleStore((state) => state.modalType);
  const data = useToggleStore((state) => state.data);

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
  const purchaseList = usePurchaseStore((state) => state.purchaseList);
  const handlePurchaseList = usePurchaseStore(
    (state) => state.handlePurchaseList
  );
  const saleList = useSaleStore((state) => state.saleList);
  const handleSaleList = useSaleStore((state) => state.handleSaleList);

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
    if (type === "delete-purchase") {
      deletePurchase({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        purchaseList,
        handlePurchaseList,
      });
    }
    if (type === "delete-sale") {
      deleteSale({
        id: data._id,
        token,
        setLoading,
        setErrorAxios,
        handleToggleModal: handleToggleModalDelete,
        toggleModal: toggleModalDelete,
        saleList,
        handleSaleList,
      });
    }
  };

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabIndex="-1"
      aria-hidden={toggleModalDelete ? "false" : "true"}
      className={`${
        toggleModalDelete ? "" : "hidden"
      } overflow-hidden fixed top-0 right-0 left-0 mx-auto z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-0 w-full max-w-xl xl:max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-slate-200 rounded-[.5rem] shadow-md dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700">
          {/* <!-- Modal header --> */}
          <div className="flex items-center justify-between p-8 border-b-0 rounded-t-[.5rem] dark:border-slate-800 border-slate-200">
            <span className="w-10 h-10 flex justify-center items-center bg-red-100 rounded-[.5rem]">
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
          <div className="p-0 px-8 space-y-4 text-sm">
            <Heading type="h3" variant="" className="font-normal">
              <span>{`¿Estás seguro de que quieres eliminar ${
                modalType === "delete"
                  ? "este empleado"
                  : modalType === "delete-product"
                  ? "este producto"
                  : modalType === "delete-supplier"
                  ? "este proveedor"
                  : modalType === "delete-purchase"
                  ? "esta compra"
                  : modalType === "delete-sale"
                  ? "esta venta"
                  : modalType === "delete-customer"
                  ? "este cliente"
                  : modalType === "delete-product-category"
                  ? "esta categoria de producto"
                  : modalType === "delete-payment-method"
                  ? "este método de pago"
                  : modalType === "delete-expense-category"
                  ? "esta categoria de gastos"
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
                  : modalType === "delete-purchase"
                  ? "Proveedor"
                  : modalType === "delete-sale"
                  ? "Cliente"
                  : modalType === "delete-payment-method"
                  ? "Método de pago"
                  : "Nombre"}
                :{" "}
              </span>
              {modalType === "delete-purchase" ? (
                <span>{data?.supplierId?.name}</span>
              ) : modalType === "delete-sale" ? (
                <span>{data?.customerId?.name}</span>
              ) : (
                <span>
                  {data?.name} {data?.surname}
                </span>
              )}
            </p>
            <p className="leading-0 text-slate-800 dark:text-slate-200 flex justify-start items-center gap-2">
              <span className="font-medium">
                {modalType === "delete-product-category" ||
                modalType === "delete-expense-category" ||
                modalType === "delete-product" ||
                modalType === "delete-payment-method"
                  ? "Descripción:"
                  : modalType === "delete-purchase" ||
                    modalType === "delete-sale"
                  ? "Total:"
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
                  : modalType === "delete-purchase" ||
                    modalType === "delete-sale"
                  ? formatterco.format(data?.total_amount)
                  : data?.contactInfo?.email}
              </span>
            </p>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-end items-end gap-4 p-8 border-t-0 border-slate-200 rounded-b-[.5rem] dark:border-slate-800">
            <Button
              text={"Cancelar"}
              onClick={() => handleToggleModalDelete(!toggleModalDelete)}
              icon={""}
              type={"button"}
              styles={"cursor-pointer mt-5"}
              mode={"default"}
              variant={"cancel"}
            />
            <Button
              text={"Eliminar"}
              onClick={() => handleDelete(modalType)}
              icon={""}
              type={"button"}
              styles={"cursor-pointer mt-5"}
              mode={"default"}
              variant={"danger"}
            />
          </div>
        </div>
      </div>
      {loading.deleteUser ||
      loading.deleteProduct ||
      loading.deleteSupplier ||
      loading.deleteCustomer ||
      loading.deletePurchase ||
      loading.deleteSale ||
      loading.deleteProductCategory ? (
        <Loader type={""} />
      ) : null}
    </div>
  );
};

export default Delete;
