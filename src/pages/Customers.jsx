import React, { Suspense, useEffect, useState } from "react";
import DataTable from "@/components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useShallow } from "zustand/shallow";
import { formatterco } from "@/utils/formatter";
import { useAuthStore } from "../store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import Dots from "@/icons/Dots";
import Select from "@/components/Select";
import Loader from "@/components/Loader";

import IndeterminateCheckbox from "@/components/datatable/IndeterminateCheckbox";
import moment from "moment/moment";
import "moment/locale/es";
import { useCustomerStore } from "@/store/customer.store";
import { getCustomerList } from "../utils/customerMethods";

const Customers = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const customerList = useCustomerStore((state) => state.customerList);
  const handleCustomerList = useCustomerStore(
    (state) => state.handleCustomerList
  );
  const { toggleModal, handleToggleModal, handleToggleSelect } = useToggleStore(
    useShallow((state) => ({
      toggleModal: state.toggleModal,
      handleToggleModal: state.handleToggleModal,
      handleToggleSelect: state.handleToggleSelect,
    }))
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  useEffect(() => {
    if (customerList === null) {
      getCustomerList({
        setLoading,
        token,
        setErrorAxios,
        handleCustomerList,
      });
    }
  }, []);

  const reload = () => {
    getCustomerList({
      setLoading,
      token,
      setErrorAxios,
      handleCustomerList,
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
      header: "Cliente",
      cell: ({ row }) => (
        <span className="w-full flex justify-center items-center gap-2">
          <span>{row.original.name}</span>
          <span>{row.original.surname}</span>
        </span>
      ),
    }),
    columnHelper.accessor("email", {
      header: "Correo Electrónico",
    }),
    columnHelper.accessor("phone", {
      header: "Teléfono",
    }),
    columnHelper.accessor("address.city", {
      header: "Ciudad",
    }),
    columnHelper.accessor("events_history.customer_created_at", {
      header: "Creado",
      cell: ({ row }) =>
        moment(row.original.events_history.customer_created_at).format("LLL"),
    }),
    columnHelper.accessor("acciones", {
      header: "",
      cell: ({ row, table }) => (
        <div className="flex justify-center gap-2 relative">
          <button
            onClick={() => handleToggleSelect(true, row.original._id)}
            className="inline-flex gap-2 items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-gray-100 dark:hover:bg-Shippingco-850 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 rounded-[.5rem] px-2 text-xs h-7 border-none"
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
                  type: "details-customer",
                  data: row.original,
                },
                {
                  name: "Editar",
                  func: "modal",
                  type: "edit-customer",
                  data: row.original,
                },
                {
                  name: "Eliminar",
                  func: "modalDelete",
                  type: "delete-customer",
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
          data={customerList || []}
          columns={columns}
          text={"Crear"}
          reload={reload}
          create={handleToggleModal}
          boolean={toggleModal}
          createTypeModal={"create-customer"}
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

export default Customers;
