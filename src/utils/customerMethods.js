import axios from "axios";
import { notify } from "./alertNotify";

const getCustomerList = async ({
  token,
  setLoading,
  setErrorAxios,
  handleCustomerList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, customers: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/customers/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res customer list: ", res);
    if (res.status === 200) {
      handleCustomerList(res.data.allCustomers);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, customers: false }));
  }
};

const createCustomer = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  customerList,
  handleCustomerList,
}) => {
  console.log({ data });
  try {
    setLoading((prev) => ({ ...prev, createCustomer: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/customers/create`,
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,

        address: {
          addressline: data.addressline,
          city: data.city,
          province: data.province,
          country: data.country,
        },
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create customer: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        const updateCustomerList = [...customerList, res.data.data];
        handleCustomerList(updateCustomerList);
      }, 2000);
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
    setLoading((prev) => ({ ...prev, createCustomer: false }));
  }
};

const updateCustomer = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  customerList,
  handleCustomerList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editCustomer: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/customers/${id}`,
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: {
          addressline: data.addressline,
          city: data.city,
          province: data.province,
          country: data.country,
        },
        events_history: {
          customer_updated_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit customer: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);
      setTimeout(() => {
        const customer = res.data.updated;
        const updateCustomerList = customerList.map((c) =>
          c._id === id ? customer : c
        );
        handleCustomerList(updateCustomerList);
        handleToggleModal(!toggleModal);
      }, 3000);
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
    setLoading((prev) => ({ ...prev, editCustomer: false }));
  }
};

const deleteCustomer = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  customerList,
  handleCustomerList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteCustomer: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/customers/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete customer: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateCustomerList = customerList.filter((c) => c._id !== id);
        handleCustomerList(updateCustomerList);
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
    setLoading((prev) => ({ ...prev, deleteCustomer: false }));
  }
};

export { getCustomerList, createCustomer, updateCustomer, deleteCustomer };
