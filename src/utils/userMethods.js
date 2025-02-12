import axios from "axios";

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

export { getUserList };
