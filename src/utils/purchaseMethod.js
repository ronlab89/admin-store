import axios from "axios";
import { notify } from "./alertNotify";

const getPurchaseList = async ({ setLoading, token, handlePurchaseList }) => {
  try {
    setLoading((prev) => ({ ...prev, purchaseList: true }));
    const res = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/purchases/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res purchase list: ", res);
    if (res.status === 200) {
      handlePurchaseList(res.data.allPurchases);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, purchaseList: false }));
  }
};

const createPurchase = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  resetPreticket,
  purchaseList,
  handlePurchaseList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, createPurchase: true }));
    const res = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/purchases/create`,
      data: {
        supplierId: data.supplierId,
        products: data.products,
        total_amount: data.total_amount,
        payment_method: data.payment_method,
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create purchase: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updatePurchaseList = [...purchaseList, res.data.data];
        handlePurchaseList(updatePurchaseList);
        resetPreticket();
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, createPurchase: false }));
  }
};

const deletePurchase = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  purchaseList,
  handlePurchaseList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deletePurchase: true }));
    const res = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/purchases/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete purchase: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updatePurchaseList = purchaseList.filter(
          (purchase) => purchase._id !== id
        );
        handlePurchaseList(updatePurchaseList);
        handleToggleModal(!toggleModal);
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, deletePurchase: false }));
  }
};

export { getPurchaseList, createPurchase, deletePurchase };
