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
import Dots from "@/icons/Dots";
import Select from "@/components/Select";

import { formatterco, formatterus } from "@/utils/formatter";
import { getProductCategoryList } from "../utils/productCategoryMethods";
import { getSupplierList } from "../utils/supplierMethods";
import { useProductCategoryStore } from "@/store/productCategory";
import { useSupplierStore } from "@/store/supplier.store";

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
    handleToggleSelect,
  } = useToggleStore(
    useShallow((state) => ({
      toggleModalSide: state.toggleModalSide,
      handleModalType: state.handleModalType,
      toggleModal: state.toggleModal,
      handleToggleModal: state.handleToggleModal,
      handleToggleModalSide: state.handleToggleModalSide,
      handleToggleSelect: state.handleToggleSelect,
    }))
  );
  const supplierList = useSupplierStore((state) => state.supplierList);
  const handleSupplierList = useSupplierStore(
    (state) => state.handleSupplierList
  );
  const productCategoryList = useProductCategoryStore(
    (state) => state.productCategoryList
  );
  const handleProductCategoryList = useProductCategoryStore(
    (state) => state.handleProductCategoryList
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState({});

  useEffect(() => {
    if (productList === null) {
      getProductList({ setLoading, token, handleProductList });
    }
    if (productCategoryList === null) {
      getProductCategoryList({
        token,
        setLoading,
        setErrorAxios,
        handleProductCategoryList,
      });
    }
    if (supplierList === null) {
      getSupplierList({
        setLoading,
        token,
        setErrorAxios,
        handleSupplierList,
      });
    }
  }, []);

  const reload = () => {
    getProductList({ setLoading, token, handleProductList });
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
    columnHelper.accessor("category.name", {
      header: "Categoria",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("price", {
      header: "Precio Unitario",
      cell: ({ row }) => formatterco.format(row.original.price),
    }),
    columnHelper.accessor("supplier.name", {
      header: "Proveedor",
    }),
    columnHelper.accessor("acciones", {
      header: "",
      cell: ({ row, table }) => (
        <div className="flex justify-center gap-2 relative">
          <button
            onClick={() => handleToggleSelect(true, row.original._id)}
            className="inline-flex gap-2 items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-gray-100 dark:hover:bg-Shippingco-850 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 rounded-md px-2 text-xs h-7 border-none"
            type="button"
            id="radix-:r48:"
          >
            <Dots width={18} height={18} styles={""} />

            <span className="sr-only">Open menu</span>
          </button>
          <div className="absolute top-[-50px] left-[-65px]">
            <Select
              actions={[
                {
                  name: "Detalles",
                  func: "modal",
                  type: "details-product",
                  data: row.original,
                },
                {
                  name: "Editar",
                  func: "modal",
                  type: "edit-product",
                  data: row.original,
                },
                {
                  name: "Eliminar",
                  func: "modalDelete",
                  type: "delete-product",
                  data: row.original,
                },
              ]}
              id={row.original._id}
              rowIndex={row.index}
              totalRows={table.getRowModel().rows.length}
            />
          </div>
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
