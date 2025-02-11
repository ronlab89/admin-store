import axios from "axios";

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
  } finally {
    setLoading((prev) => ({ ...prev, products: false }));
  }
};

export { getProductList };
