import React, { useEffect, useState } from "react";
import Ticket from "../components/sales/Ticket";
import List from "../components/sales/List";
import Tabs from "../components/Tabs/Tabs";
import { useAuthStore } from "../store/auth.store";
import { useSaleStore } from "../store/sale.store";
import { getSaleList } from "../utils/saleMethods";
import { getPaymentMethodList } from "../utils/paymentMethods";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import { getCustomerList } from "../utils/customerMethods";
import { useCustomerStore } from "@/store/customer.store";
import Loader from "@/components/Loader";
import { useProductStore } from "@/store/product.store";
import { getProductList } from "../utils/productMethods";

const Sales = () => {
  const token = useAuthStore((state) => state.token);
  const handleSaleList = useSaleStore((state) => state.handleSaleList);
  const handleCustomerList = useCustomerStore(
    (state) => state.handleCustomerList
  );
  const customerList = useCustomerStore((state) => state.customerList);
  const saleList = useSaleStore((state) => state.saleList);
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

  const saleTabs = [
    {
      id: "sale-ticket",
      title: "Ticket de venta",
    },
    {
      id: "sale-list",
      title: "Lista de ventas",
    },
  ];

  const content = [
    { id: "sale-ticket", content: <Ticket /> },
    { id: "sale-list", content: <List /> },
  ];

  useEffect(() => {
    if (saleList === null) {
      getSaleList({ setLoading, token, handleSaleList });
    }
    if (customerList === null) {
      getCustomerList({
        setLoading,
        token,
        setErrorAxios,
        handleCustomerList,
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
      ) : !customerList ||
        !saleList ||
        !paymentMethodList ||
        !productList ? null : (
        <Tabs tabs={saleTabs} content={content} />
      )}
    </section>
  );
};

export default Sales;
