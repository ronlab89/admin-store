import React, { useEffect, useState } from "react";
import Ticket from "../components/sales/Ticket";
import List from "../components/sales/List";
import Tabs from "../components/Tabs/Tabs";
import { useAuthStore } from "../store/auth.store";
import { useSaleStore } from "../store/sale.store";
import { getSaleList } from "../utils/saleMethods";
import { getPaymentMethodList } from "../utils/paymentMethods";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";

const Sales = () => {
  const token = useAuthStore((state) => state.token);
  const handleSaleList = useSaleStore((state) => state.handleSaleList);
  const saleList = useSaleStore((state) => state.saleList);
  const handlePaymentMethodList = usePaymentMethodStore(
    (state) => state.handlePaymentMethodList
  );
  const paymentMethodList = usePaymentMethodStore(
    (state) => state.paymentMethodList
  );
  const [loading, setLoading] = useState({});

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
    if (paymentMethodList === null) {
      getPaymentMethodList({ setLoading, token, handlePaymentMethodList });
    }
  }, []);

  return (
    <section className="w-full h-full">
      <Tabs tabs={saleTabs} content={content} />
    </section>
  );
};

export default Sales;
