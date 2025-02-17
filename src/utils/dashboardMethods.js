import axios from "axios";
import { notify } from "./alertNotify";

const consultDataDashboard = async ({
  setLoading,
  token,
  consultDate,
  setErrorAxios,
  handleTotalPurchases,
  handleTotalSales,
  handleRevenue,
  handleTopSuppliers,
  handleTopProductsQauntity,
  handleTopCustomers,
  handleProductvs,
  handleTopProductsAmount,
}) => {
  try {
    setLoading((prev) => ({ ...prev, dataDashboard: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/dashboard/data-dashboard`,
      data: {
        consultDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Res data dashboard: ", res);
    if (res.status === 200) {
      const data = res.data.data;
      handleTotalPurchases(data.totalPurchases);
      handleTotalSales(data.totalSales);
      handleRevenue(data.revenue);
      handleTopSuppliers(data.topSuppliers);
      handleTopProductsQauntity(data.topProductsByQuantity);
      handleTopCustomers(data.topCustomers);
      handleProductvs({
        least: data.leastSoldProduct,
        most: data.mostSoldProduct,
      });
      handleTopProductsAmount(data.topProductsByAmount);
      notify("success", res.data.message);
    }
  } catch (error) {
    console.log("Error: ", error);
    setErrorAxios(error.message);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, dataDashboard: false }));
  }
};

const consultDataProfile = async ({
  setLoading,
  token,
  employeeId,
  setErrorAxios,
  handleProfileProducts,
  handleProfilevs,
}) => {
  try {
    setLoading((prev) => ({ ...prev, dataDashboard: true }));
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_API_URL}/dashboard/data-profile`,
      data: {
        employeeId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Res data Profile: ", res);
    if (res.status === 200) {
      const data = res.data.data;
      handleProfileProducts(data.topProductsByQuantity);
      handleProfilevs({
        least: data.leastSoldProduct,
        most: data.mostSoldProduct,
      });
      notify("success", res.data.message);
    }
  } catch (error) {
    console.log("Error: ", error);
    setErrorAxios(error.message);
    notify("error", error?.response?.data);
  } finally {
    setLoading((prev) => ({ ...prev, dataDashboard: false }));
  }
};

export { consultDataDashboard, consultDataProfile };
