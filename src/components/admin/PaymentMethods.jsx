import React from "react";
import VerticalTabs from "../tabs/VerticalTabs";
import { paymentMethods } from "../../data/paymentMethods";
import Payment from "@/icons/Payment";
import { useAuthStore } from "../../store/auth.store";
import { usePaymentMethodStore } from "@/store/paymentMethod.store";
import {
  createPaymentMethod,
  updatePaymentMethod,
} from "../../utils/paymentMethods";

const PaymentMethods = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const paymentMethodList = usePaymentMethodStore(
    (state) => state.paymentMethodList
  );
  const handlePaymentMethodList = usePaymentMethodStore(
    (state) => state.handlePaymentMethodList
  );

  const handleCreate = (data, setLoading, setErrorAxios) => {
    console.log({ data });
    createPaymentMethod({
      data,
      token,
      setLoading,
      setErrorAxios,
      paymentMethodList,
      handlePaymentMethodList,
    });
  };
  const handleEdit = (
    { name, description },
    isEdit,
    setLoading,
    setErrorAxios
  ) => {
    console.log({ name, description, data: isEdit.data });
    updatePaymentMethod({
      data: { name, description },
      token,
      id: isEdit.data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      paymentMethodList,
      handlePaymentMethodList,
    });
  };

  return (
    <section>
      <VerticalTabs
        data={paymentMethods}
        list={paymentMethodList}
        icon={<Payment width={20} height={20} />}
        type={"payment-method"}
        createMethod={handleCreate}
        editMethod={handleEdit}
      />
    </section>
  );
};

export default PaymentMethods;
