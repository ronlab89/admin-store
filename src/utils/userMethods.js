import axios from "axios";
import { notify } from "./alertNotify";
// import { getMarketList } from "./marketsMethods";

const getUserList = async ({
  setLoading,
  token,
  setErrorAxios,
  user,
  handleUserList,
}) => {
  try {
    setLoading((prev) => ({ ...prev, users: true }));
    const res = await axios({
      method: "get",
      url: `${import.meta.env.VITE_API_URL}/user/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res user list: ", res);
    if (res.status === 200) {
      const preusers = res.data.allUsers.filter((u) => u.email !== user.email);
      handleUserList(preusers);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, users: false }));
  }
};

// Makematch
const linkedto = async (
  type,
  userId,
  market,
  setLoading,
  setErrorAxios,
  handleToggleModal,
  handleMarketList,
  toggleModal,
  user,
  handleUserList
) => {
  // console.log("LLega: ", userId, market);
  const url =
    type === "linked"
      ? `${import.meta.env.VITE_API_BASE_URL}/users/match`
      : `${import.meta.env.VITE_API_BASE_URL}/marketplaces/match`;
  try {
    setLoading((prev) => ({ ...prev, makematch: true }));
    const res = await axios({
      method: "post",
      url: url,
      data: {
        principalID: userId,
        toLinkID: market.toLinkID,
        type: market.type,
        name: market.name,
      },
    });
    if ((res.status = 200)) {
      notify(
        "success",
        `${
          type === "linked"
            ? "Se asoció la tienda al usuario con exito!"
            : "Se asoció el transporte a la tienda con exito!"
        }`
      );
      setTimeout(() => {
        handleToggleModal(!toggleModal);
        getUserList(setLoading, user, handleUserList, setErrorAxios);
        getMarketList(setLoading, handleMarketList, setErrorAxios);
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
    setLoading((prev) => ({ ...prev, makematch: false }));
  }
};

export { getUserList, linkedto };
