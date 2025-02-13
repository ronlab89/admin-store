import React, { useEffect, useState } from "react";
import Tabs from "../components/Tabs/Tabs";
import ProductCategories from "../components/admin/ProductCategories";
import { getProductCategoryList } from "../utils/productCategoryMethods";
import { useAuthStore } from "../store/auth.store";
import { useProductCategoryStore } from "@/store/productCategory";
import { useToggleStore } from "@/store/toggle.store";
import { useShallow } from "zustand/shallow";

const Admin = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const productCategoryList = useProductCategoryStore(
    (state) => state.productCategoryList
  );
  const handleProductCategoryList = useProductCategoryStore(
    (state) => state.handleProductCategoryList
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
  }, []);

  return (
    <section className="w-full h-full">
      <Tabs tabs={adminTabs} content={content} />
    </section>
  );
};

export default Admin;
