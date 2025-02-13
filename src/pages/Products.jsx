import { lazy, useEffect, useState, Suspense } from "react";
const DataTable = lazy(() => import("@/components/DataTable"));
import { createColumnHelper } from "@tanstack/react-table";
import { useShallow } from "zustand/react/shallow";
import { useToggleStore } from "@/store/toggle.store";
import IndeterminateCheckbox from "@/components/datatable/IndeterminateCheckbox";
import { getProductList } from "../utils/productMethods";
import { useAuthStore } from "../store/auth.store";
import { useProductStore } from "../store/product.store";
import Loader from "@/components/Loader";
import Details from "@/icons/Details";

import { formatterco, formatterus } from "@/utils/formatter";

import moment from "moment/moment";
import "moment/locale/es";

const Products = () => {
  const token = useAuthStore((state) => state.token);
  const productList = useProductStore((state) => state.productList);
  const handleProductList = useProductStore((state) => state.handleProductList);
  const {
    toggleModalSide,
    handleModalType,
    toggleModal,
    handleToggleModal,
    handleToggleModalSide,
  } = useToggleStore(
    useShallow((state) => ({
      toggleModalSide: state.toggleModalSide,
      handleModalType: state.handleModalType,
      toggleModal: state.toggleModal,
      handleToggleModal: state.handleToggleModal,
      handleToggleModalSide: state.handleToggleModalSide,
    }))
  );

  const [loading, setLoading] = useState({});

  useEffect(() => {
    if (productList === null) {
      getProductList({ setLoading, token, handleProductList });
    }
  }, []);

  const reload = () => {
    getOrders({
      setLoading,
      token,
      handleProductList,
    });
  };

  const columnHelper = createColumnHelper();

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
    columnHelper.accessor("name", {
      header: "Producto",
    }),
    columnHelper.accessor("category", {
      header: "Categoria",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("price", {
      header: "Precio Unitario",
      cell: ({ row }) => formatterco.format(row.original.price),
    }),
    columnHelper.accessor("supplier", {
      header: "Proveedor",
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              handleOrderDetails(row.original);
              navigate(`/inicio/orden`);
              handleLinkId("order-details");
              handleSubLinkId("");
            }}
            className="font-bold text-slate-800 hover:text-teal-600 dark:text-slate-200 dark:hover:text-teal-400 hover:transition-colors"
          >
            <Details width={20} height={20} styles={""} />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <>
      <Suspense fallback={""}>
        <DataTable
          data={productList || []}
          columns={columns}
          text={"Crear"}
          reload={reload}
          create={handleToggleModal}
          boolean={toggleModal}
          createTypeModal={"create-product"}
        />
      </Suspense>
      {loading.customers ? (
        <Suspense fallback={""}>
          <Loader />
        </Suspense>
      ) : null}
    </>
  );
};

export default Products;
