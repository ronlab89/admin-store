import { lazy, Suspense } from "react";
import { createColumnHelper } from "@tanstack/react-table";

import { useToggleStore } from "@/store/toggle.store";
import { usePurchaseStore } from "@/store/purchase.store";
import { useSaleStore } from "@/store/sale.store";

import { formatterco } from "@/utils/formatter";

import moment from "moment";

const DataTable = lazy(() => import("@/components/DataTable"));

const Details = () => {
  const data = useToggleStore((state) => state.data);
  const purchaseList = usePurchaseStore((state) => state.purchaseList);
  const saleList = useSaleStore((state) => state.saleList);

  const prepurchase = purchaseList
    .filter(
      (item) =>
        Array.isArray(item.products) &&
        item.products.some((product) => product.productId === data._id)
    )
    .map((item) => ({
      ...item,
      date: item.events_history?.purchase_created_at,
      products: item.products.filter(
        (product) => product.productId === data._id
      ),
    }));
  const presale = saleList
    .filter(
      (item) =>
        Array.isArray(item.products) &&
        item.products.some((product) => product.productId === data._id)
    )
    .map((item) => ({
      ...item,
      date: item.events_history?.sale_created_at,
      products: item.products.filter(
        (product) => product.productId === data._id
      ),
    }));

  const productInventory = [...prepurchase, ...presale].sort((a, b) => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);

    if (!dateA.isValid()) return 1;
    if (!dateB.isValid()) return -1;

    return dateB.diff(dateA);
  });

  console.log({ productInventory, prepurchase, presale });

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("customerId", {
      header: "Transacción",
      cell: ({ row }) =>
        row.original.customerId ? <span>Venta</span> : <span>Compra</span>,
    }),
    columnHelper.accessor("supplierId", {
      header: "Contacto comercial",
      cell: ({ row }) =>
        row.original.supplierId ? (
          <span>{row?.original?.supplierId?.name}</span>
        ) : (
          <span>
            {row.original.customerId.name} {row?.original?.customerId?.surname}
          </span>
        ),
    }),
    columnHelper.accessor("products", {
      header: "Cantidad",
      cell: ({ row }) =>
        row.original.products.reduce((acc, curr) => acc + curr.quantity, 0),
    }),
    columnHelper.accessor("payment_method.name", {
      header: "Metodo de pago",
    }),
    columnHelper.accessor("price", {
      header: "Total",
      cell: ({ row }) => formatterco.format(row.original.total_amount),
    }),
    columnHelper.accessor("date", {
      header: "Fecha",
      cell: ({ row }) => moment(row.original.date).format("LLL"),
    }),
  ];

  return (
    <section className="w-full h-screen flex flex-col justify-start items-start bg-slate-100 dark:bg-slate-900 rounded-[.5rem] pt-10">
      <article className="w-full flex justify-between items-center text-sm px-[40px]">
        <div className="flex flex-col">
          <div className="flex gap-2">
            <span className="font-semibold">Producto:</span>
            <span>{data?.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Categoria:</span>
            <span>{data?.category?.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Descripción:</span>
            <span>{data?.description}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2">
            <span className="font-semibold">Precio:</span>
            <span>{formatterco.format(data?.price)}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Stock:</span>
            <span>{data?.stock}</span>
          </div>
        </div>
      </article>
      <article className="pt-5">
        <Suspense fallback={""}>
          <DataTable
            data={productInventory || []}
            columns={columns}
            text={""}
            search={null}
            reload={null}
            filter={false}
          />
        </Suspense>
      </article>
    </section>
  );
};

export default Details;
