import axios from "axios";
import { notify } from "./alertNotify";
import { getUserList } from "./userMethods";

//Info user
const getUserLogged = async ({ tokenlogin, handleuser }) => {
  try {
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/auth/user`,
      headers: { Authorization: `Bearer ${tokenlogin}` },
    });
    console.log("Info User: ", res);
    if (res.status === 200) {
      const data = res.data.userLogged;
      handleuser({
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        role: data.role,
        events_history: data.events_history,
      });
      refreshToken();
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
    console.log("Res login: ", res);
    if (res.status === 200) {
      handlelogin(true, {
        token: res.data.token,
      });
      // getUserLogged(res.data.token, handleuser);
      navigate("/dashboard");
    }
  } catch (error) {
    console.log(error);
    setErrorLogin(error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, login: false }));
  }
};

const setTime = () => {
  setTimeout(() => {
    refreshToken();
  }, 840000);
};

const refreshToken = async () => {
  try {
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      withCredentials: true,
      credential: "include",
    });
    console.log("Res refreshToken: ", res);
    if (res.status === 200) {
      const data = res.data;
      handleuser({
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        role: data.role,
        events_history: data.events_history,
      });
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
const onSubmitRegister = async (
  data,
  linked,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  user,
  handleUserList
) => {
  try {
    setLoading((prev) => ({ ...prev, registerUser: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_AUTH_URL}/register`,
      data: {
        name: data.name,
        note: data.note,
        email: data.email,
        password: data.password,
      },
    });
    // console.log("Res register: ", res);
    if ((res.status = 201)) {
      notify("success", "Se creo el usuario con exito!");
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        getUserList(setLoading, user, handleUserList, setErrorAxios);
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
      notify(
        "description",
        "Usuario duplicado",
        "El email coincide con un usuario ya registrado"
      );
    }
  } finally {
    setLoading((prev) => ({ ...prev, registerUser: false }));
  }
};

//Logout
const logout = async ({
  navigate,
  resetAuth,
  resetMenu,
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
      resetMenu();
      resetToggles();
      resetUser();
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
  }
};

// Actualizar usuario
const onSubmitEdit = async (
  data,
  type,
  token,
  setLoading,
  setErrorAxios,
  handleuser,
  user,
  handleUserList,
  handleToggleModal,
  toggleModal,
  id
) => {
  // SI es type user falta pasar el id de ese usuario para poder actualizarlo
  try {
    setLoading((prev) => ({ ...prev, editUser: true }));
    const urlUpdate =
      type === "profile"
        ? `${import.meta.env.VITE_API_AUTH_URL}/me`
        : `${import.meta.env.VITE_API_BASE_URL}/users/${id}`;
    const dataUpdate =
      type === "profile"
        ? {
            name: data.name,
            note: data.note,
          }
        : { name: data.name };
    const res = await axios({
      method: "put",
      url: urlUpdate,
      data: dataUpdate,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res edit user: ", res);
    if (res.status === 200) {
      notify("success", "Se actualizo la información del usuario con éxito!");
      if (type === "profile") {
        getUserLogged(token, handleuser);
      }
      if (type === "user") {
        setTimeout(() => {
          handleToggleModal(!toggleModal);
          getUserList(setLoading, user, handleUserList, setErrorAxios);
        }, 3000);
      }
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
const deleteUser = async (
  id,
  type,
  token,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  toggleModal,
  handleUserList,
  user,
  navigate,
  resetAuth,
  resetCarrier,
  resetMarket,
  resetMenu,
  resetOrder,
  resetToggles,
  resetUser
) => {
  // SI es type user falta pasar el id de ese usuario para poder eliminarlo
  try {
    const urlDelete =
      type === "profile"
        ? `${import.meta.env.VITE_API_AUTH_URL}/me`
        : `${import.meta.env.VITE_API_BASE_URL}/users/${id}`;
    setLoading((prev) => ({ ...prev, deleteUser: true }));
    const res = await axios({
      method: "delete",
      url: urlDelete,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res delete user: ", res);
    if ((res.status = 200)) {
      notify("success", "Se eliminó el usuario con éxito!");
      setTimeout(() => {
        if (type === "profile") {
          logout(
            navigate,
            resetAuth,
            resetCarrier,
            resetMarket,
            resetMenu,
            resetOrder,
            resetToggles,
            resetUser
          );
        }
        if (type === "user") {
          getUserList(setLoading, user, handleUserList, setErrorAxios);
          handleToggleModal(!toggleModal);
        }
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
