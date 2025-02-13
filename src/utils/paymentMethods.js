import axios from "axios";
import { notify } from "./alertNotify";

const getPaymentMethodList = async ({
  token,
  setLoading,
  setErrorAxios,
  handlePaymentMethodList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, paymentMethodList: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/payment-method/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res product payment list: ", res);
    if (res.status === 200) {
      handlePaymentMethodList(res.data.allPaymentMethods);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, paymentMethodList: false }));
  }
};

const createPaymentMethod = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  paymentMethodList,
  handlePaymentMethodList,
}) => {
  console.log({ data });
  try {
    setLoading((prev) => ({ ...prev, createPaymentMethod: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/payment-method/create`,
      data: {
        name: data.name,
        description: data.description,
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create product payment: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      const updatePaymentMethodList = [...paymentMethodList, res.data.data];
      handlePaymentMethodList(updatePaymentMethodList);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error.response.data.error);
    if (
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 404 ||
      error.response.status === 500
    ) {
      notify("error", error.response.data.error);
    }
  } finally {
    setLoading((prev) => ({ ...prev, createPaymentMethod: false }));
  }
};

const updatePaymentMethod = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  paymentMethodList,
  handlePaymentMethodList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editPaymentMethod: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/payment-method/${id}`,
      data: {
        name: data.name,
        description: data.description,
        events_history: {
          paymentMethod_updated_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit product payment: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);

      const paymentMethod = res.data.updated;
      const updatePaymentMethodList = paymentMethodList.map((p) =>
        p._id === id ? paymentMethod : p
      );
      handlePaymentMethodList(updatePaymentMethodList);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error.response.data.error);
    if (
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 404 ||
      error.response.status === 500
    ) {
      notify(
        "error",
        error.status === 401 ? error.response.data : error.response.data.error
      );
    }
  } finally {
    setLoading((prev) => ({ ...prev, editPaymentMethod: false }));
  }
};

const deletePaymentMethod = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  paymentMethodList,
  handlePaymentMethodList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deletePaymentMethod: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/payment-method/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete product payment: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updatePaymentMethodList = paymentMethodList.filter(
          (p) => p._id !== id
        );
        handlePaymentMethodList(updatePaymentMethodList);
        handleToggleModal(!toggleModal);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error.response.data.error);
    if (
      error.response.status === 400 ||
      error.response.status === 401 ||
      error.response.status === 404 ||
      error.response.status === 500
    ) {
      notify(
        "error",
        error.status === 401 ? error.response.data : error.response.data.error
      );
    }
  } finally {
    setLoading((prev) => ({ ...prev, deletePaymentMethod: false }));
  }
};

export {
  getPaymentMethodList,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
