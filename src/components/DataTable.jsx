import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

import { useToggleStore } from "@/store/toggle.store";
import { useMenuStore } from "@/store/menu.store";

import Button from "@/components/Button";
// import Popover from "@/components/Popover";
import Search from "@/Icons/Search";
import Filter from "@/Icons/Filter";
import Create from "@/Icons/Create";
import Batch from "@/Icons/Batch";
import Reload from "@/Icons/Reload";
import Angles from "@/Icons/Angles";
import Angle from "@/Icons/Angle";

const DataTable = ({
  data,
  columns,
  reload,
  text,
  create,
  boolean,
  selectTypeModal,
  createTypeModal,
  sideType,
  filter,
}) => {
  const {
    toggleSidebar,
    handleModalType,
    handleTogglePop,
    handleModalSideType,
  } = useToggleStore(
    useShallow((state) => ({
      toggleSidebar: state.toggleSidebar,
      handleModalType: state.handleModalType,
      handleTogglePop: state.handleTogglePop,
      handleModalSideType: state.handleModalSideType,
    }))
  );

  const { linkId, handleLinkId, handleSubLinkId } = useMenuStore(
    useShallow((state) => ({
      linkId: state.linkId,
      handleLinkId: state.handleLinkId,
      handleSubLinkId: state.handleSubLinkId,
    }))
  );

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});

  const table = useReactTable({
    data,
    columns,
    // getSubRows: (row) => row.subrows || [], // si se tiene subfilas con la misma estructura de la fila original
    getRowCanExpand: (row) => true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      rowSelection: rowSelection,
      globalFilter: filtering,
      columnVisibility: { _id: false },
      expanded,
    },
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
  });

  // useEffect(() => {
  //   handleOrdersBatch(table.getSelectedRowModel().rows.map((x) => x.original));
  // }, [table.getSelectedRowModel()]);

  return (
    <section
      className={`${
        !toggleSidebar ? "w-[94vw]" : "w-[84vw]"
      } min-h-[80vh] max-h-full p-2 text-sm relative z-10`}
    >
      <article className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          {/* Input search */}
          <div className="relative w-[300px]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search
                width={15}
                height={15}
                styles={"text-slate-800 dark:text-slate-200"}
              />
            </div>
            <input
              type="search"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              id="default-search"
              className="ps-10 text-sm mb-0 flex pl-12 h-9 w-full rounded-[20px] border border-slate-800 dark:border-slate-200 border-input bg-transparent px-3 py-1 shadow-sm transition-colors font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-600 dark:placeholder:text-slate-400 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#a1a1aa] dark:focus-visible:ring-[#d4d4d8] disabled:cursor-not-allowed disabled:opacity-50
              "
              placeholder="Busqueda"
              required
            />
          </div>
          {/* Filters */}

          <Button
            text={"Filtros"}
            icon={<Filter width={15} height={15} styles={""} />}
            reverse={false}
            onClick={() => {
              handleModalSideType(sideType);
              create(!boolean);
            }}
            styles={!filter ? "hidden" : ""}
          />
        </div>
        <div className={` flex justify-between items-center gap-5 z-10`}>
          {/* Create */}

          <Button
            text={text}
            icon={<Create width={15} height={15} styles={""} />}
            reverse={false}
            onClick={() => {
              handleModalType(createTypeModal);
              create(!boolean);
            }}
            styles={
              text === undefined || text === "" || text !== "Crear"
                ? "hidden"
                : ""
            }
          />

          {/* Batch */}
          <div
            onMouseEnter={() => handleTogglePop(true, "popover-top")}
            onMouseLeave={() => handleTogglePop(false, null)}
            data-popover-target="popover-top"
            data-popover-placement="top"
            className={`relative ${
              text === undefined || text === "" ? "" : "hidden"
            }`}
          >
            {/* <Button
              text={"Procesar lote"}
              icon={<Batch width={15} height={15} styles={""} />}
              reverse={false}
              url={"/inicio/lote-ordenes"}
              onClick={() => {
                handleLinkId("order-details");
                handleSubLinkId("");
              }}
              // disabled={ordersBatch.length <= 1 ? true : false}
            /> */}

            {/* <Popover
              id={"popover-top"}
              title={""}
              content={
                ordersBatch.length <= 1
                  ? "Debes seleccionar 2 o mas órdenes para procesarlas en lote!"
                  : "Haz clic para procesar el lote seleccionado!"
              }
              styles={`top-[35px] left-0 ${
                ordersBatch.length <= 1 ? "w-[140px]" : "w-[130px]"
              }`}
            /> */}
          </div>
          {/* Reload */}

          <Button
            text={"Recargar"}
            icon={<Reload width={14} height={14} styles={""} />}
            reverse={false}
            onClick={reload}
          />
        </div>
      </article>
      {/* Table */}
      <table
        className={`w-full h-full rounded-[0rem] overflow-hidden mt-10 z-10`}
      >
        <thead
          className={`text-center rounded-[0rem] font-medium tracking-[0.01rem] z-10`}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className={`w-full tex-center rounded-[0rem] border border-slate-300 dark:border-slate-700`}
            >
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`text-center py-3 rounded-[0rem] ${
                    index === 0
                      ? "rounded-tl-[0rem]"
                      : index === headerGroup.headers.length - 1 &&
                        "rounded-tr-[0rem]"
                  }`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {
                    {
                      asc: "△",
                      desc: "▽",
                    }[header.column.getIsSorted() ?? null]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="overflow-hidden rounded-b-[.5rem] z-10 text-[0.8rem]">
          {table.getRowModel().rows.map((row, indexRow) => (
            <React.Fragment key={row.id}>
              <tr
                className={`border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 ${
                  indexRow === table.getRowModel().rows.length - 1
                    ? "rounded-b-[.5rem]"
                    : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={`text-center py-2`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {/* Subfilas */}
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getAllCells().length}>
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <div>
                        {row.original.linked_to.map((linked) => (
                          <div key={linked._id} className="mb-3">
                            <p className="font-semibold">
                              {linked.cred_type === "carrier"
                                ? "Transporte:"
                                : "Tienda:"}
                            </p>
                            <span>{linked.cred_name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} className={`text-center`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {/* Pagination */}
      <article
        className={`w-full flex justify-between items-center gap-1 mt-5`}
      >
        <div className="flex justify-center items-center gap-2 ml-5">
          <label htmlFor="select-page-size">Mostrar</label>
          <select
            id="select-page-size"
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="text-Shippingco-900 dark:text-Shippingco-100 bg-transparent"
          >
            {[5, 7, 10, 20, 30, 40, 50].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="text-Shippingco-900"
              >
                {pageSize}
              </option>
            ))}
          </select>
          <span>por página</span>
        </div>

        <div className="flex justify-center items-center gap-2 mr-5 z-10">
          <div className="flex justify-center items-center gap-2">
            <span>Página</span>
            <span>{table.getState().pagination.pageIndex + 1}</span>
            <span>de</span>
            <span>{table.getPageCount()}</span>
          </div>
          <div
            onClick={() => table.setPageIndex(0)}
            className={`${
              table.getState().pagination.pageIndex === 0
                ? "text-gray-300 dark:text-gray-700"
                : "cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-Shippingco-850"
            } w-8 h-8 border-[1px] border-dashed border-gray-300 dark:border-gray-600 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
          >
            <Angles width={12.8} height={12.8} styles={"rotate-[90deg]"} />
          </div>
          <div
            onClick={() => table.previousPage()}
            className={`${
              table.getState().pagination.pageIndex === 0
                ? "text-gray-300 dark:text-gray-700"
                : "cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-Shippingco-850"
            } w-8 h-8  border-[1px]  border-dashed border-gray-300 dark:border-gray-600 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
          >
            <Angle width={12.8} height={12.8} styles={"rotate-[90deg]"} />
          </div>
          <div
            onClick={() => {
              if (
                table.getState().pagination.pageIndex + 2 <=
                table.getPageCount()
              ) {
                table.nextPage();
              }
            }}
            className={`${
              table.getState().pagination.pageIndex + 2 <= table.getPageCount()
                ? "cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-Shippingco-850"
                : "text-gray-300 dark:text-gray-700"
            } w-8 h-8  border-[1px] border-dashed border-gray-300 dark:border-gray-600 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
          >
            <Angle width={12.8} height={12.8} styles={"rotate-[-90deg]"} />
          </div>
          <div
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            className={`${
              table.getState().pagination.pageIndex + 2 <= table.getPageCount()
                ? "cursor-pointer text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-Shippingco-850"
                : "text-gray-300 dark:text-gray-700"
            } w-8 h-8  border-[1px] border-dashed border-gray-300 dark:border-gray-600 rounded-[.5rem] flex justify-center items-center transition-colors duration-300`}
          >
            <Angles width={12.8} height={12.8} styles={"rotate-[-90deg]"} />
          </div>
        </div>
      </article>
      <div>
        {/* {console.log(
          "FIlas seleccionadas: ",
          table.getSelectedRowModel().rows.map((x) => x.original)
        )} */}
      </div>
    </section>
  );
};

export default DataTable;
