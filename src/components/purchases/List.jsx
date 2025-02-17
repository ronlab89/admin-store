import { Suspense, useState, useEffect, lazy } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import { useToggleStore } from "@/store/toggle.store";
import { useAuthStore } from "@/store/auth.store";
import { usePurchaseStore } from "@/store/purchase.store";

import { getPurchaseList } from "../../utils/PurchaseMethod";
import { formatterco, formatterus } from "@/utils/formatter";

const Loader = lazy(() => import("@/components/Loader"));
const Select = lazy(() => import("@/components/Select"));
const DataTable = lazy(() => import("@/components/DataTable"));

import Dots from "@/icons/Dots";

import moment from "moment/moment";
import "moment/locale/es";

const List = () => {
  const token = useAuthStore((state) => state.token);
  const purchaseList = usePurchaseStore((state) => state.purchaseList);
  const handlePurchaseList = usePurchaseStore(
    (state) => state.handlePurchaseList
  );
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const handleToggleSelect = useToggleStore(
    (state) => state.handleToggleSelect
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState({});

  useEffect(() => {
    if (purchaseList === null) {
      getPurchaseList({ setLoading, token, handlePurchaseList });
    }
  }, []);

  const reload = () => {
    getPurchaseList({ setLoading, token, handlePurchaseList });
  };

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
    columnHelper.accessor("supplierId.name", {
      header: "Proveedor",
    }),
    columnHelper.accessor("payment_method.name", {
      header: "Metodo de pago",
    }),
    columnHelper.accessor("products", {
      header: "Articulos",
      cell: ({ row }) =>
        row.original.products.reduce((acc, curr) => acc + curr.quantity, 0),
    }),
    columnHelper.accessor("total_amount", {
      header: "Total",
      cell: ({ row }) => formatterco.format(row.original.total_amount),
    }),
    columnHelper.accessor("events_history.purchase_created_at", {
      header: "Fecha",
      cell: ({ row }) =>
        moment(row.original.events_history.purchase_created_at).format("LLL"),
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
            <Suspense fallback={""}>
              <Select
                actions={[
                  {
                    name: "Detalles",
                    func: "modal",
                    type: "details-purchase",
                    data: row.original,
                  },
                  {
                    name: "Editar",
                    func: "modal",
                    type: "edit-purchase",
                    data: row.original,
                  },
                  {
                    name: "Eliminar",
                    func: "modalDelete",
                    type: "delete-purchase",
                    data: row.original,
                  },
                ]}
                id={row.original._id}
                rowIndex={row.index}
                totalRows={table.getRowModel().rows.length}
              />
            </Suspense>
          </div>
        </div>
      ),
    }),
  ];

  return (
    <section
      className={`${
        toggleSidebar
          ? "lg:w-[74vw] xl:w-[79.2vw] min-[90rem]:w-[81.5vw] 2xl:w-[82.5vw] mt-[0px] px-[10px]"
          : "lg:w-[90.5vw] xl:w-[92.3vw] min-[90rem]:w-[93.15vw] 2xl:w-[93.45vw] px-[10px]"
      } px-[20px] flex justify-center items-start`}
    >
      <Suspense fallback={""}>
        <DataTable
          data={purchaseList || []}
          columns={columns}
          text={""}
          reload={reload}
          create={handleToggleModal}
          boolean={toggleModal}
          createTypeModal={"create-purchase"}
        />
      </Suspense>
      {loading.customers ? (
        <Suspense fallback={""}>
          <Loader />
        </Suspense>
      ) : null}
    </section>
  );
};

export default List;
