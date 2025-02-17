import { lazy, Suspense, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { useShallow } from "zustand/shallow";

import { useUserStore } from "@/store/user.store";
import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";

import { getUserList } from "@/utils/userMethods";
import { handleCopyText } from "@/utils/Copy";

const DataTable = lazy(() => import("@/components/DataTable"));
const Select = lazy(() => import("@/components/Select"));
const Loader = lazy(() => import("@/components/Select"));

import Dots from "@/icons/Dots";

import moment from "moment/moment";
import "moment/locale/es";

const Employees = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const { userList, handleUserList } = useUserStore(
    useShallow((state) => ({
      userList: state.userList,
      handleUserList: state.handleUserList,
    }))
  );
  const toggleModal = useToggleStore((state) => state.toggleModal);
  const handleToggleModal = useToggleStore((state) => state.handleToggleModal);
  const handleToggleSelect = useToggleStore(
    (state) => state.handleToggleSelect
  );

  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);

  useEffect(() => {
    if (userList === null) {
      getUserList({ setLoading, token, setErrorAxios, user, handleUserList });
    }
  }, []);

  const reload = () => {
    getUserList({ setLoading, token, setErrorAxios, user, handleUserList });
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
    columnHelper.accessor("name", {
      header: "Nombre",
    }),
    columnHelper.accessor("surname", {
      header: "Apellido",
    }),
    columnHelper.accessor("email", {
      header: "Correo Electronico",
      cell: ({ row }) => (
        <div
          onClick={() =>
            handleCopyText(row.original.email, "el correo electrónico")
          }
          className="flex justify-center items-center gap-2 cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 hover:transition-colors"
        >
          {row.original.email}
        </div>
      ),
    }),
    columnHelper.accessor("role", {
      header: "Cargo",
    }),
    columnHelper.accessor("events_history.user_created_at", {
      header: "Creado",
      cell: ({ row }) =>
        moment(row.original.events_history.user_created_at).format("LLL"),
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
                    name: "Perfil",
                    func: "url",
                    type: "profile",
                    data: row.original,
                  },
                  {
                    name: "Editar",
                    func: "modal",
                    type: "edit",
                    data: row.original,
                  },
                  {
                    name: "Eliminar",
                    func: "modalDelete",
                    type: "delete",
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
    <>
      <Suspense fallback={""}>
        <DataTable
          data={userList || []}
          columns={columns}
          text={"Crear"}
          reload={reload}
          create={handleToggleModal}
          boolean={toggleModal}
          createTypeModal={"register"}
        />
      </Suspense>
      {loading.users ? (
        <Suspense fallback={""}>
          <Loader />
        </Suspense>
      ) : null}
    </>
  );
};

export default Employees;
