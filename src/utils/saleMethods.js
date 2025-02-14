import axios from "axios";
import { notify } from "./alertNotify";

const getSaleList = async ({ setLoading, token, handleSaleList }) => {
  try {
    setLoading((prev) => ({ ...prev, saleList: true }));
    const res = await axios({
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/sales/list`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Res sale list: ", res);
    if (res.status === 200) {
      handleSaleList(res.data.allSales);
    }
  } catch (error) {
    console.log(error);
    setErrorAxios(error?.response?.data);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, saleList: false }));
  }
};

export { getSaleList };
