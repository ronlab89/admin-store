import DataTable from "@/components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useShallow } from "zustand/react/shallow";
import { useToggleStore } from "@/store/toggle.store";
import IndeterminateCheckbox from "@/components/datatable/IndeterminateCheckbox";
import { useEffect, useState } from "react";
import { getProductList } from "../utils/productMethods";
import { useAuthStore } from "../store/auth.store";
import { useProductStore } from "../store/product.store";
import io from "socket.io-client";

import { formatterco, formatterus } from "@/utils/formatter";

import moment from "moment/moment";
import "moment/locale/es";

const Inventory = () => {
  const socket = io(`${import.meta.env.VITE_IO_URL}`);
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
    // if (productList === null) {
    //   getProductList({ setLoading, token, handleProductList });
    // }

    socket.emit("fetchProducts"); // Solicitar productos al conectar
    socket.on("initialProducts", (initialProducts) => {
      console.log({ initialProducts });
      handleProductList(initialProducts);
    });

    // Escuchar actualizaciones de stock
    socket.on("stockUpdated", (updatedProducts) => {
      handleProductList(updatedProducts);
    });

    // Limpiar listeners al desmontar el componente
    return () => {
      socket.off("initialProducts");
      socket.off("stockUpdated");
    };
  }, []);

  const reload = () => {
    // getOrders(
    //   setLoading,
    //   setErrorAxios,
    //   handleOrdersList,
    //   handleOrdersByStatus,
    //   filters,
    //   page
    // );
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
    columnHelper.accessor("stock", {
      header: "Stock",
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
            className="font-bold hover:text-Shippingco-blue dark:hover:text-Shippingco-yellow"
          >
            {row.original.status === "paid" &&
            row.original.shopify_obj.fulfillment_status === null
              ? "Procesar"
              : "Detalles"}
          </button>
        </div>
      ),
    }),
  ];

  return (
    <DataTable
      data={productList || []}
      columns={columns}
      text={""}
      reload={reload}
      create={handleToggleModalSide}
      boolean={toggleModalSide.status}
      selectTypeModal={"right"}
      sideType={"filters"}
      filter={false}
    />
  );
};

export default Inventory;
