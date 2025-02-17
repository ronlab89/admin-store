import { productCategories } from "@/data/productCategories";

import { useProductCategoryStore } from "@/store/productCategory.store";
import { useAuthStore } from "@/store/auth.store";

import {
  createProductCategory,
  updateProductCategory,
} from "@/utils/productCategoryMethods";

import VerticalTabs from "@/components/tabs/VerticalTabs";

import Category from "@/icons/Category";

const ProductCategories = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const productCategoryList = useProductCategoryStore(
    (state) => state.productCategoryList
  );
  const handleProductCategoryList = useProductCategoryStore(
    (state) => state.handleProductCategoryList
  );

  const handleCreate = (data, setLoading, setErrorAxios) => {
    createProductCategory({
      data,
      token,
      setLoading,
      setErrorAxios,
      productCategoryList,
      handleProductCategoryList,
    });
  };
  const handleEdit = (
    { name, description },
    isEdit,
    setLoading,
    setErrorAxios
  ) => {
    updateProductCategory({
      data: { name, description },
      token,
      id: isEdit.data._id,
      user: user.id,
      setLoading,
      setErrorAxios,
      productCategoryList,
      handleProductCategoryList,
    });
  };

  return (
    <section>
      <VerticalTabs
        data={productCategories}
        list={productCategoryList}
        icon={<Category width={20} height={20} />}
        type={"product-category"}
        createMethod={handleCreate}
        editMethod={handleEdit}
      />
    </section>
  );
};

export default ProductCategories;
