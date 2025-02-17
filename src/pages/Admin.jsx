import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/auth.store";
import { useProductCategoryStore } from "@/store/productCategory.store";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { useExpenseCategoryStore } from "@/store/expenseCategory.store";
import { useToggleStore } from "@/store/toggle.store";

import { getProductCategoryList } from "@/utils/productCategoryMethods";
import { getPaymentMethodList } from "@/utils/paymentMethods";
import { getExpenseCategoryList } from "@/utils/expenseCategoryMethods";

import Tabs from "@/components/Tabs/Tabs";
import ProductCategories from "@/components/admin/ProductCategories";
import PaymentMethods from "@/components/admin/PaymentMethods";
import ExpenseCategories from "@/components/admin/ExpenseCategories";

const Admin = () => {
  const token = useAuthStore((state) => state.token);
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
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);

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
    <section
      className={`${
        toggleSidebar
          ? "lg:w-[76.5vw] xl:w-[81.2vw] min-[90rem]:w-[83.5vw] 2xl:w-[84.5vw] mt-[0px] px-[20px]"
          : "lg:w-[92.9vw] xl:w-[94.3vw] min-[90rem]:w-[95.15vw] 2xl:w-[95.45vw] px-[20px]"
      }`}
    >
      <Tabs tabs={adminTabs} content={content} />
    </section>
  );
};

export default Admin;
