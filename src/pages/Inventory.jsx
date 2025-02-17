import { lazy, Suspense, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import io from "socket.io-client";

import { useToggleStore } from "@/store/toggle.store";
import { useProductStore } from "@/store/product.store";
import { useAuthStore } from "@/store/auth.store";
import { usePurchaseStore } from "@/store/purchase.store";
import { useSaleStore } from "@/store/sale.store";

import { formatterco } from "@/utils/formatter";
import { getPurchaseList } from "@/utils/PurchaseMethod";
import { getSaleList } from "@/utils/saleMethods";

const DataTable = lazy(() => import("@/components/DataTable"));
const Loader = lazy(() => import("@/components/Loader"));
import Details from "@/icons/Details";

const Inventory = () => {
  const socket = io(`${import.meta.env.VITE_IO_URL}`);
  const token = useAuthStore((state) => state.token);
  const productList = useProductStore((state) => state.productList);
  const handleProductList = useProductStore((state) => state.handleProductList);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const handleModalType = useToggleStore((state) => state.handleModalType);
  const handleData = useToggleStore((state) => state.handleData);
  const purchaseList = usePurchaseStore((state) => state.purchaseList);
  const handlePurchaseList = usePurchaseStore(
    (state) => state.handlePurchaseList
  );
  const saleList = useSaleStore((state) => state.saleList);
  const handleSaleList = useSaleStore((state) => state.handleSaleList);

  const [loading, setLoading] = useState({});

  useEffect(() => {
    socket.emit("fetchProducts"); // Solicitar productos al conectar
    socket.on("initialProducts", (initialProducts) => {
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

  useEffect(() => {
    if (purchaseList === null) {
      getPurchaseList({ setLoading, token, handlePurchaseList });
    }
    if (saleList === null) {
      getSaleList({ setLoading, token, handleSaleList });
    }
  }, []);

  const columnHelper = createColumnHelper();

  const columns = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <IndeterminateCheckbox
    //       {...{
    //         checked: table.getIsAllRowsSelected(),
    //         indeterminate: table.getIsSomeRowsSelected(),
    //         onChange: table.getToggleAllRowsSelectedHandler(),
    //       }}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <div className="px-1">
    //       <IndeterminateCheckbox
    //         {...{
    //           checked: row.getIsSelected(),
    //           disabled: !row.getCanSelect(),
    //           indeterminate: row.getIsSomeSelected(),
    //           onChange: row.getToggleSelectedHandler(),
    //         }}
    //       />
    //     </div>
    //   ),
    // },
    columnHelper.accessor("name", {
      header: "Producto",
    }),
    columnHelper.accessor("category.name", {
      header: "Categoria",
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
    }),
    columnHelper.accessor("price", {
      header: "Precio Unitario",
      cell: ({ row }) => formatterco.format(row.original.price),
    }),
    columnHelper.accessor("supplier.name", {
      header: "Proveedor",
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              handleToggleModal(!toggleModal);
              handleModalType("inventory-details");
              handleData(row.original);
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
          text={""}
          reload={null}
          create={handleToggleModal}
          boolean={toggleModal}
          filter={false}
        />
      </Suspense>
      {loading.productList ? (
        <Suspense fallback={""}>
          <Loader />
        </Suspense>
      ) : null}
    </>
  );
};

export default Inventory;
