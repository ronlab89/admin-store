import axios from "axios";
import { notify } from "./alertNotify";

const getExpenseCategoryList = async ({
  token,
  setLoading,
  setErrorAxios,
  handleExpenseCategoryList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, expenseCategoryList: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/expense-category/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res expense category list: ", res);
    if (res.status === 200) {
      handleExpenseCategoryList(res.data.allExpenseCategorys);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, expenseCategoryList: false }));
  }
};

const createExpenseCategory = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  expenseCategoryList,
  handleExpenseCategoryList,
}) => {
  console.log({ data });
  try {
    setLoading((prev) => ({ ...prev, createExpenseCategory: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/expense-category/create`,
      data: {
        name: data.name,
        description: data.description,
        events_history: {
          user: user,
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res create expense category: ", res);
    if (res.status === 201) {
      notify("success", res.data.message);
      const updateExpenseCategoryList = [...expenseCategoryList, res.data.data];
      handleExpenseCategoryList(updateExpenseCategoryList);
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
    setLoading((prev) => ({ ...prev, createExpenseCategory: false }));
  }
};

const updateExpenseCategory = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  expenseCategoryList,
  handleExpenseCategoryList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editExpenseCategory: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/expense-category/${id}`,
      data: {
        name: data.name,
        description: data.description,
        events_history: {
          expenseCategory_updated_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit expense category: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);

      const expenseCategory = res.data.updated;
      const updateExpenseCategoryList = expenseCategoryList.map((p) =>
        p._id === id ? expenseCategory : p
      );
      handleExpenseCategoryList(updateExpenseCategoryList);
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
    setLoading((prev) => ({ ...prev, editExpenseCategory: false }));
  }
};

const deleteExpenseCategory = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  expenseCategoryList,
  handleExpenseCategoryList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteExpenseCategory: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/expense-category/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete expense category: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateExpenseCategoryList = expenseCategoryList.filter(
          (p) => p._id !== id
        );
        handleExpenseCategoryList(updateExpenseCategoryList);
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
    setLoading((prev) => ({ ...prev, deleteExpenseCategory: false }));
  }
};

export {
  getExpenseCategoryList,
  createExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
};
