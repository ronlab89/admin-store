import React, { useEffect, useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import ProductCategories from "../components/admin/ProductCategories";
import { getProductCategoryList } from "../utils/productCategoryMethods";
import { useAuthStore } from "../store/auth.store";
import { useProductCategoryStore } from "@/store/productCategory";
import { useToggleStore } from "@/store/toggle.store";
import { useShallow } from "zustand/shallow";
import PaymentMethods from "../components/admin/PaymentMethods";
import ExpenseCategories from "../components/admin/ExpenseCategories";
import { getPaymentMethodList } from "../utils/paymentMethods";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { getExpenseCategoryList } from "../utils/expenseCategoryMethods";
import { useExpenseCategoryStore } from "@/store/expenseCategory.store";

const Admin = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const productCategoryList = useProductCategoryStore(
    (state) => state.productCategoryList
  );
  const handleProductCategoryList = useProductCategoryStore(
    (state) => state.handleProductCategoryList
  );
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
  const { toggleModal, handleToggleModal, handleToggleSelect } = useToggleStore(
    useShallow((state) => ({
      toggleModal: state.toggleModal,
      handleToggleModal: state.handleToggleModal,
      handleToggleSelect: state.handleToggleSelect,
    }))
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  const adminTabs = [
    {
      id: "product-categories",
      title: "Categorias de producto",
    },
    {
      id: "payment-methods",
      title: "Metodos de pago",
    },
    {
      id: "expense-categories",
      title: "Categorias de gasto",
    },
  ];

  const content = [
    { id: "product-categories", content: <ProductCategories /> },
    { id: "payment-methods", content: <PaymentMethods /> },
    { id: "expense-categories", content: <ExpenseCategories /> },
  ];

  useEffect(() => {
    if (productCategoryList === null) {
      getProductCategoryList({
        token,
        setLoading,
        setErrorAxios,
        handleProductCategoryList,
      });
    }
    if (paymentMethodList === null) {
      getPaymentMethodList({
        token,
        setLoading,
        setErrorAxios,
        handlePaymentMethodList,
      });
    }
    if (expenseCategoryList === null) {
      getExpenseCategoryList({
        token,
        setLoading,
        setErrorAxios,
        handleExpenseCategoryList,
      });
    }
  }, []);

  return (
    <section className="w-full h-full">
      <Tabs tabs={adminTabs} content={content} />
    </section>
  );
};

export default Admin;
