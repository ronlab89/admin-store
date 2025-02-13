import axios from "axios";
import { notify } from "./alertNotify";

const getProductCategoryList = async ({
  token,
  setLoading,
  setErrorAxios,
  handleProductCategoryList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, productCategoryList: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/product-category/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res product category list: ", res);
    if (res.status === 200) {
      handleProductCategoryList(res.data.allProductCategorys);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, productCategoryList: false }));
  }
};

const createProductCategory = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  productCategoryList,
  handleProductCategoryList,
}) => {
  console.log({ data });
  try {
    setLoading((prev) => ({ ...prev, createProductCategory: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/product-category/create`,
      data: {
        name: data.name,
        description: data.description,
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create product category: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      const updateProductCategoryList = [...productCategoryList, res.data.data];
      handleProductCategoryList(updateProductCategoryList);
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
    setLoading((prev) => ({ ...prev, createProductCategory: false }));
  }
};

const updateProductCategory = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  productCategoryList,
  handleProductCategoryList,
  handleToggleSelect,
  setIsEdit,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editProductCategory: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/product-category/${id}`,
      data: {
        name: data.name,
        description: data.description,
        events_history: {
          productCategory_updated_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit product category: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);

      const productCategory = res.data.updated;
      const updateProductCategoryList = productCategoryList.map((p) =>
        p._id === id ? productCategory : p
      );
      handleProductCategoryList(updateProductCategoryList);
      handleToggleSelect(false, null);
      setIsEdit({ status: false, id: null, data: null });
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
    setLoading((prev) => ({ ...prev, editProductCategory: false }));
  }
};

const deleteProductCategory = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  productCategoryList,
  handleProductCategoryList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteProductCategory: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/product-category/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete product category: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateProductCategoryList = productCategoryList.filter(
          (p) => p._id !== id
        );
        handleProductCategoryList(updateProductCategoryList);
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
    setLoading((prev) => ({ ...prev, deleteProductCategory: false }));
  }
};

export {
  getProductCategoryList,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
