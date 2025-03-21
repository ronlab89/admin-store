import axios from "axios";
import { notify } from "./alertNotify";

const getSaleList = async ({ setLoading, token, handleSaleList }) => {
  try {
    setLoading((prev) => ({ ...prev, saleList: true }));
    const res = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/sales/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res sale list: ", res);
    if (res.status === 200) {
      handleSaleList(res.data.allSales);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, saleList: false }));
  }
};

const createSale = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  resetPreticket,
  saleList,
  handleSaleList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, createSale: true }));
    const res = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_URL}/sales/create`,
      data: {
        customerId: data.customerId,
        products: data.products,
        total_amount: data.total_amount,
        payment_method: data.payment_method,
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create sale: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateSaleList = [...saleList, res.data.data];
        handleSaleList(updateSaleList);
        resetPreticket();
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, createSale: false }));
  }
};

const deleteSale = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  saleList,
  handleSaleList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteSale: true }));
    const res = await axios({
      method: "DELETE",
      url: `${import.meta.env.VITE_API_URL}/sales/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete sale: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateSaleList = saleList.filter((sale) => sale._id !== id);
        handleSaleList(updateSaleList);
        handleToggleModal(!toggleModal);
      }, 2000);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, deleteSale: false }));
  }
};

export { getSaleList, createSale, deleteSale };
