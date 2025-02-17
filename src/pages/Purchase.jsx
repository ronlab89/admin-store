import React, { useEffect, useState } from "react";
import Ticket from "../components/purchases/Ticket";
import List from "../components/purchases/List";
import Tabs from "../components/Tabs/Tabs";
import { useAuthStore } from "../store/auth.store";
import { getPaymentMethodList } from "../utils/paymentMethods";
import Loader from "@/components/Loader";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { useProductStore } from "@/store/product.store";
import { usePurchaseStore } from "@/store/purchase.store";
import { useSupplierStore } from "../store/supplier.store";
import { getPurchaseList } from "../utils/PurchaseMethod";
import { getSupplierList } from "../utils/supplierMethods";
import { getProductList } from "../utils/productMethods";

const Purchase = () => {
  const token = useAuthStore((state) => state.token);
  const handlePurchaseList = usePurchaseStore(
    (state) => state.handlePurchaseList
  );
  const handleSupplierList = useSupplierStore(
    (state) => state.handleSupplierList
  );
  const supplierList = useSupplierStore((state) => state.supplierList);
  const purchaseList = usePurchaseStore((state) => state.purchaseList);

  const handlePaymentMethodList = usePaymentMethodStore(
    (state) => state.handlePaymentMethodList
  );
  const paymentMethodList = usePaymentMethodStore(
    (state) => state.paymentMethodList
  );
  const handleProductList = useProductStore((state) => state.handleProductList);
  const productList = useProductStore((state) => state.productList);
  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  const purchaseTabs = [
    {
      id: "purchase-ticket",
      title: "Ticket de compra",
    },
    {
      id: "purchase-list",
      title: "Lista de compras",
    },
  ];

  const content = [
    { id: "purchase-ticket", content: <Ticket /> },
    { id: "purchase-list", content: <List /> },
  ];

  useEffect(() => {
    if (purchaseList === null) {
      getPurchaseList({ setLoading, token, handlePurchaseList });
    }
    if (supplierList === null) {
      getSupplierList({
        setLoading,
        token,
        setErrorAxios,
        handleSupplierList,
      });
    }
    if (paymentMethodList === null) {
      getPaymentMethodList({ setLoading, token, handlePaymentMethodList });
    }
    if (productList === null) {
      getProductList({ setLoading, token, handleProductList });
    }
  }, []);

  return (
    <section className="w-full h-full">
      {loading.saleList ||
      loading.customers ||
      loading.paymentMethods ||
      loading.productList ? (
        <Loader type={""} />
      ) : !supplierList ||
        !purchaseList ||
        !paymentMethodList ||
        !productList ? null : (
        <Tabs tabs={purchaseTabs} content={content} />
      )}
    </section>
  );
};

export default Purchase;
