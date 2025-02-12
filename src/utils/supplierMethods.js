import axios from "axios";
import { notify } from "./alertNotify";

const getSupplierList = async ({
  setLoading,
  token,
  setErrorAxios,
  handleSupplierList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, suppliers: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/suppliers/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res supplier list: ", res);
    if (res.status === 200) {
      handleSupplierList(res.data.allSupplier);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, suppliers: false }));
  }
};

const createSupplier = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  supplierList,
  handleSupplierList,
}) => {
  console.log({ data });
  try {
    setLoading((prev) => ({ ...prev, createSupplier: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/suppliers/create`,
      data: {
        name: data.name,
        contactInfo: {
          phone: data.phone,
          email: data.email,
          website: data.website,
        },
        address: {
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          province: data.province,
          province_code: data.province_code,
          country: data.country,
          country_code: data.country_code,
          zip: data.zip,
        },
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create supplier: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        const updateSupplierList = [...supplierList, res.data.data];
        handleSupplierList(updateSupplierList);
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
    setLoading((prev) => ({ ...prev, createSupplier: false }));
  }
};

const updateSupplier = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  supplierList,
  handleSupplierList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editSupplier: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/suppliers/${id}`,
      data: {
        name: data.name,
        contactInfo: {
          phone: data.phone,
          email: data.email,
          website: data.website,
        },
        address: {
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          province: data.province,
          province_code: data.province_code,
          country: data.country,
          country_code: data.country_code,
          zip: data.zip,
        },
        events_history: {
          supplier_updated_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit supplier: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);
      setTimeout(() => {
        const supplier = res.data.updated;
        const updateSupplierList = supplierList.map((s) =>
          s._id === id ? supplier : s
        );
        handleSupplierList(updateSupplierList);
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
    setLoading((prev) => ({ ...prev, editSupplier: false }));
  }
};

const deleteSupplier = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  supplierList,
  handleSupplierList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteSupplier: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/suppliers/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete supplier: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateSupplierList = supplierList.filter((s) => s._id !== id);
        handleSupplierList(updateSupplierList);
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
    setLoading((prev) => ({ ...prev, deleteSupplier: false }));
  }
};

export { getSupplierList, createSupplier, updateSupplier, deleteSupplier };
