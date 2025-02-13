import React from "react";
import VerticalTabs from "../tabs/VerticalTabs";
import { productCategories } from "../../data/productCategories";

const ProductCategories = () => {
  return (
    <section>
      <VerticalTabs data={productCategories} />
    </section>
  );
};

export default ProductCategories;
