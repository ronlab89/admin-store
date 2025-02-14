import { lazy, useEffect, useState, Suspense } from "react";
const DataTable = lazy(() => import("@/components/DataTable"));
import { createColumnHelper } from "@tanstack/react-table";
import { useShallow } from "zustand/react/shallow";
import { useToggleStore } from "@/store/toggle.store";
import IndeterminateCheckbox from "@/components/datatable/IndeterminateCheckbox";
import { useAuthStore } from "@/store/auth.store";
import { useSaleStore } from "@/store/sale.store";
import Loader from "@/components/Loader";
import Dots from "@/icons/Dots";
import Select from "@/components/Select";

import { formatterco, formatterus } from "@/utils/formatter";
import { useSupplierStore } from "@/store/supplier.store";
import { getSaleList } from "@/utils/saleMethods";

import moment from "moment/moment";
import "moment/locale/es";

const List = () => {
  const token = useAuthStore((state) => state.token);
  const saleList = useSaleStore((state) => state.saleList);
  const handleSaleList = useSaleStore((state) => state.handleSaleList);
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

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState({});

  useEffect(() => {
    if (saleList === null) {
      getSaleList({ setLoading, token, handleSaleList });
    }
  }, []);

  const reload = () => {
    getSaleList({ setLoading, token, handleSaleList });
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
    columnHelper.accessor("customer", {
      header: "Cliente",
    }),
    columnHelper.accessor("payment_method", {
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
    columnHelper.accessor("events_history.sale_created_at", {
      header: "Fecha",
      cell: ({ row }) =>
        moment(row.original.events_history.sale_created_at).format("LLL"),
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
                  type: "details-sale",
                  data: row.original,
                },
                {
                  name: "Editar",
                  func: "modal",
                  type: "edit-sale",
                  data: row.original,
                },
                {
                  name: "Eliminar",
                  func: "modalDelete",
                  type: "delete-sale",
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
    <section className="w-full h-full px-[20px] flex justify-center items-start">
      <Suspense fallback={""}>
        <DataTable
          data={saleList || []}
          columns={columns}
          text={""}
          reload={reload}
          create={handleToggleModal}
          boolean={toggleModal}
          createTypeModal={"create-sale"}
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
