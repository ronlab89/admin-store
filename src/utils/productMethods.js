import axios from "axios";
import { notify } from "./alertNotify";

const getProductList = async ({ setLoading, token, handleProductList }) => {
  try {
    setLoading((prev) => ({ ...prev, products: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/products/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res product list: ", res);
    if (res.status === 200) {
      const data = res.data.allProducts;
      handleProductList(data);
    }
  } catch (error) {
    console.log("error: ", error);
    notify("error", error.response.data.error);
  } finally {
    setLoading((prev) => ({ ...prev, products: false }));
  }
};

const createProduct = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  productList,
  handleProductList,
}) => {
  console.log({ data });
  try {
    setLoading((prev) => ({ ...prev, createProduct: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/products/create`,
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: 0,
        category: data.category,
        supplier: data.supplier,
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create product: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        const updateProductList = [...productList, res.data.data];
        handleProductList(updateProductList);
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
    setLoading((prev) => ({ ...prev, createProduct: false }));
  }
};

const updateProduct = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  productList,
  handleProductList,
  handleToggleModal,
  toggleModal,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editProduct: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/products/${id}`,
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        supplier: data.supplier,
        events_history: {
          product_updated_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit product: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        const product = res.data.updated;
        const updateProductList = productList.map((p) =>
          p._id === id ? product : p
        );
        handleProductList(updateProductList);
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
      notify(
        "error",
        error.status === 401 ? error.response.data : error.response.data.error
      );
    }
  } finally {
    setLoading((prev) => ({ ...prev, editProduct: false }));
  }
};

const deleteProduct = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  productList,
  handleProductList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteProduct: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/products/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete product: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateProductList = productList.filter((p) => p._id !== id);
        handleProductList(updateProductList);
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
    setLoading((prev) => ({ ...prev, deleteProduct: false }));
  }
};

export { getProductList, createProduct, updateProduct, deleteProduct };
