import DataTable from "@/components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useShallow } from "zustand/react/shallow";
import { useToggleStore } from "@/store/toggle.store";
import IndeterminateCheckbox from "@/components/datatable/IndeterminateCheckbox";

const Inventory = () => {
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
    columnHelper.accessor("order_name", {
      header: "Orden",
    }),
    columnHelper.accessor("shopify_obj.order_number", {
      header: "#",
    }),
    columnHelper.accessor("createdAt", {
      header: "Creada",
      cell: (info) => moment(info.getValue()).format("LL"),
    }),
    columnHelper.accessor("shopify_obj.total_price", {
      header: "Total",
      cell: ({ row }) =>
        row.original.shop_name === "Shopify 2bdevelopment"
          ? formatterus.format(row.original.shopify_obj.total_price)
          : formatterco.format(row.original.shopify_obj.total_price),
    }),
    columnHelper.accessor("shop_name", {
      header: "Tienda",
    }),
    columnHelper.accessor("line_items", {
      header: "Artículos",
      cell: (info) =>
        info.getValue()?.reduce((acc, val) => acc + val.quantity, 0),
    }),
    columnHelper.accessor("status", {
      header: "Estado",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <span
            className={`block w-2 h-2 rounded-full ${
              row.original.status === "pending" &&
              row.original.shopify_obj.fulfillment_status === null
                ? "bg-gray-600"
                : (row.original.status === "refunded" ||
                    row.original.status === "authorized" ||
                    row.original.status === "partially_paid" ||
                    row.original.status === "partially_refunded") &&
                  row.original.shopify_obj.fulfillment_status === null
                ? "bg-yellow-600"
                : row.original.status === "paid" &&
                  row.original.shopify_obj.fulfillment_status === null
                ? "bg-blue-600"
                : row.original.status === "paid" &&
                  row.original.shopify_obj.fulfillment_status === "fulfilled"
                ? "bg-green-600"
                : row.original.status === "voided" &&
                  row.original.shopify_obj.fulfillment_status === null
                ? "bg-red-600"
                : ""
            }`}
          ></span>
          <span>
            {row.original.status === "pending" &&
            row.original.shopify_obj.fulfillment_status === null
              ? "En espera de pago"
              : (row.original.status === "refunded" ||
                  row.original.status === "authorized" ||
                  row.original.status === "partially_paid" ||
                  row.original.status === "partially_refunded") &&
                row.original.shopify_obj.fulfillment_status === null
              ? "En espera"
              : row.original.status === "paid" &&
                row.original.shopify_obj.fulfillment_status === null
              ? "En espera de envío"
              : row.original.status === "paid" &&
                row.original.shopify_obj.fulfillment_status === "fulfilled"
              ? "Enviada"
              : row.original.status === "voided" &&
                row.original.shopify_obj.fulfillment_status === null
              ? "Anulada"
              : ""}
          </span>
        </div>
      ),
    }),
    columnHelper.accessor("", {
      header: "Etiqueta",
      cell: (row) => {
        const shipping = delivers.find(
          (item) => item.order_name === row.row.original.order_name
        );
        return shipping ? (
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => {
              handleToggleModal(!toggleModal);
              handleModalType("label");
              handleUrlPdf(shipping?.carrier_response_obj?.url_pdf);
            }}
          >
            <Label width={15} height={15} styles="" />
          </div>
        ) : (
          <span>--</span>
        );
      },
    }),
    columnHelper.accessor("", {
      header: "Rastreo",
      cell: (row) => {
        const shipping = delivers.find(
          (item) => item.order_name === row.row.original.order_name
        );
        return shipping ? (
          <div className="flex justify-center items-center text-[1rem]">
            <a
              href={shipping?.shopify_obj?.fulfillments[0]?.tracking_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rastrear envío en la web del transporte"
            >
              <TruckFast width={16} height={16} styles={""} />
            </a>
          </div>
        ) : (
          <span>--</span>
        );
      },
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
      data={[]}
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
