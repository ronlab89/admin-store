import axios from "axios";
import { notify } from "./alertNotify";
import { getUserList } from "./userMethods";

//Info user
const getUserLogged = async ({ tokenlogin, handleuser, handlelogin }) => {
  try {
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/auth/user`,
      headers: { Authorization: `Bearer ${tokenlogin}` },
    });
    console.log("Res user logged: ", res);
    if (res.status === 200) {
      const data = res.data.userLogged;
      handleuser({
        id: data._id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        role: data.role,
        events_history: data.events_history,
      });
      refreshToken({ handlelogin });
    }
  } catch (error) {
    console.log(error);
    if (
      error?.response?.status === 400 ||
      error?.response?.status === 401 ||
      error?.response?.status === 500
    ) {
      notify("error", error?.response?.data);
    }
  }
};

//Login
const onSubmitLogin = async (
  { email, password },
  setLoading,
  navigate,
  setErrorLogin,
  handlelogin,
  handleuser
) => {
  try {
    setLoading((prev) => ({ ...prev, login: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/auth/login`,
      data: { email, password },
      withCredentials: true,
    });
    if (res.status === 200) {
      handlelogin(true, {
        token: res.data.token,
      });
      getUserLogged({ tokenlogin: res.data.token, handleuser, handlelogin });
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
    setErrorLogin(error?.response?.data);
    notify("error", error.response.data.error);
  } finally {
    setLoading((prev) => ({ ...prev, login: false }));
  }
};

const setTime = () => {
  setTimeout(() => {
    refreshToken();
  }, 840000);
};

const refreshToken = async ({ handlelogin }) => {
  try {
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      withCredentials: true,
      credential: "include",
    });
    // console.log("Res refreshToken: ", res);
    if (res.status === 200) {
      const data = res.data.refresh;
      handlelogin(true, {
        token: data.token,
      });
      setTime();
    }
  } catch (error) {
    console.log(error.message);
  }
};

//Register
const onSubmitRegister = async ({
  data,
  token,
  user,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  userList,
  handleUserList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, registerUser: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/auth/register`,
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
        password: data.password,
        repassword: data.repassword,
        role: data.role,
        events_history: {
          user: user,
        },
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Res register: ", res);
    if ((res.status = 201)) {
      notify("success", res.data.message);
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        const updateUserList = [...userList, res.data.data];
        handleUserList(updateUserList);
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
    setLoading((prev) => ({ ...prev, registerUser: false }));
  }
};

//Logout
const logout = async ({
  navigate,
  resetAuth,
  resetCustomer,
  resetDashboard,
  resetExpenseCategory,
  resetMenu,
  resetPaymentMethod,
  resetProduct,
  resetSale,
  resetSupplier,
  resetToggles,
  resetUser,
}) => {
  try {
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/auth/logout`,
      withCredentials: true,
    });
    if (res.status === 200) {
      resetAuth();
      resetCustomer();
      resetDashboard();
      resetExpenseCategory();
      resetMenu();
      resetPaymentMethod();
      resetProduct();
      resetSale();
      resetSupplier();
      resetToggles();
      resetUser();
      navigate("/");
    }
  } catch (error) {
    console.log(error);
    notify("error", error.response.data.error);
  } finally {
    notify("success", "Se ha cerrado la sesión");
  }
};

// Actualizar usuario
const onSubmitEdit = async ({
  data,
  token,
  id,
  user,
  setLoading,
  setErrorAxios,
  userList,
  handleUserList,
  handleToggleModal,
  toggleModal,
  type,
  handleuser,
  handleDataProfile,
}) => {
  try {
    setLoading((prev) => ({ ...prev, editUser: true }));
    const res = await axios({
      method: "put",
      url: `${import.meta.env.VITE_API_URL}/user/${id}`,
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
        role: data.role,
        events_history: {
          user_edited_at: {
            date: Date.now(),
            updating_user: user,
          },
        },
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit user: ", res);
    if (res.status === 200) {
      notify("success", res.data.message);
      setTimeout(() => {
        const user = res.data.updated;
        if (type === "profile") {
          handleuser({
            id: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            events_history: user.events_history,
          });
          handleDataProfile(user);
        }
        const updateUserList = userList.map((u) => (u._id === id ? user : u));
        handleUserList(updateUserList);
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
    setLoading((prev) => ({ ...prev, editUser: false }));
  }
};

// Eliminar usuario
const deleteUser = async ({
  id,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  userList,
  handleUserList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, deleteUser: true }));
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_API_URL}/user/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete user: ", res);
    if ((res.status = 200)) {
      notify("success", res.data.message);
      setTimeout(() => {
        const updateUserList = userList.filter((u) => u._id !== id);
        handleUserList(updateUserList);
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
    setLoading((prev) => ({ ...prev, deleteUser: false }));
  }
};

export {
  getUserLogged,
  onSubmitLogin,
  onSubmitRegister,
  onSubmitEdit,
  deleteUser,
  logout,
};
