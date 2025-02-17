import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/store/auth.store";
import { useToggleStore } from "@/store/toggle.store";
import { useDashboardStore } from "@/store/dashboard.store";

import { consultDataDashboard } from "@/utils/dashboardMethods";
import { formatterco } from "@/utils/formatter";

import Heading from "@/components/Heading";
import ChartColumn from "@/components/dashboard/ChartColumn";
import ChartLine from "@/components/dashboard/ChartLine";
import ChartRadialBar from "@/components/dashboard/ChartRadialBar";
import ChartBar from "@/components/dashboard/ChartBar";
import ChartPolarArea from "@/components/dashboard/ChartPolarArea";
import Loader from "@/components/Loader";

import Customer from "@/icons/Customer";
import Supplier from "@/icons/Supplier";
import Product from "@/icons/Product";
import Sale from "@/icons/Sale";

const Dashboard = () => {
  const token = useAuthStore((state) => state.token);
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  const handleConsultDate = useDashboardStore(
    (state) => state.handleConsultDate
  );
  const [loading, setLoading] = useState({});
  const [errorAxios, setErrorAxios] = useState(null);
  const {
    totalPurchases,
    totalSales,
    revenue,
    topSuppliers,
    topProductsQauntity,
    topCustomers,
    productvs,
    topProductsAmount,
  } = useDashboardStore(
    useShallow((state) => ({
      totalPurchases: state.totalPurchases,
      totalSales: state.totalSales,
      revenue: state.revenue,
      topSuppliers: state.topSuppliers,
      topProductsQauntity: state.topProductsQauntity,
      topCustomers: state.topClients,
      productvs: state.productvs,
      topProductsAmount: state.topProductsAmount,
    }))
  );
  const consultDate = useDashboardStore((state) => state.consultDate);
  const handleTotalPurchases = useDashboardStore(
    (state) => state.handleTotalPurchases
  );
  const handleTotalSales = useDashboardStore((state) => state.handleTotalSales);
  const handleRevenue = useDashboardStore((state) => state.handleRevenue);
  const handleTopSuppliers = useDashboardStore(
    (state) => state.handleTopSuppliers
  );
  const handleTopProductsQauntity = useDashboardStore(
    (state) => state.handleTopProductsQauntity
  );
  const handleTopCustomers = useDashboardStore(
    (state) => state.handleTopCustomers
  );
  const handleProductvs = useDashboardStore((state) => state.handleProductvs);
  const handleTopProductsAmount = useDashboardStore(
    (state) => state.handleTopProductsAmount
  );

  useEffect(() => {
    consultDataDashboard({
      setLoading,
      token,
      consultDate,
      setErrorAxios,
      handleTotalPurchases,
      handleTotalSales,
      handleRevenue,
      handleTopSuppliers,
      handleTopProductsQauntity,
      handleTopCustomers,
      handleProductvs,
      handleTopProductsAmount,
    });
  }, [consultDate]);

  return (
    <>
      {(totalPurchases === 0 ||
        totalSales === 0 ||
        revenue === 0 ||
        topSuppliers === null ||
        topProductsQauntity === null ||
        topCustomers === null ||
        productvs === null ||
        topProductsAmount === null) &&
      loading.dataDashboard ? (
        <Loader type={""} />
      ) : (
        <section
          className={`${
            toggleSidebar
              ? "lg:w-[76.5vw] xl:w-[81.2vw] min-[90rem]:w-[83.5vw] 2xl:w-[84.5vw] mt-[0px] px-[20px]"
              : "lg:w-[92.9vw] xl:w-[94.3vw] min-[90rem]:w-[95.15vw] 2xl:w-[95.45vw] px-[20px]"
          } overflow-hidden pr-[40px]`}
        >
          <article className="w-full h-full flex justify-between items-start">
            <div className="flex flex-col">
              <Heading type={"h2"} variant={""} extraStyles={"flex flex-col"}>
                <span className="font-semibold text-2xl">Ganancia</span>
                <span className="text-2xl">{formatterco.format(revenue)}</span>
              </Heading>
              <div className="flex justify-between items-center gap-2">
                <span className="w-fit h-fit bg-blue-100 dark:bg-blue-900 px-4 py-1 rounded-[.5rem] flex flex-col">
                  <span className="text-xs font-medium">Compras</span>
                  {formatterco.format(totalPurchases)}
                </span>
                <span className="w-fit h-fit bg-teal-100 dark:bg-teal-900 px-4 py-1 rounded-[.5rem] flex flex-col">
                  <span className="text-xs font-medium">Ventas</span>
                  {formatterco.format(totalSales)}
                </span>
              </div>
            </div>
            <div className="flex justify-end items-end gap-2">
              <div className="flex flex-col">
                <span className="font-semiibold text-sm">Consultar mes:</span>
                <input
                  type="month"
                  name="month"
                  id="month"
                  onChange={(e) => {
                    handleConsultDate(e.target.value);
                  }}
                  className="w-full h-full rounded-md border border-slate-100 dark:border-slate-900 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-input px-3 py-1 text-xs shadow-sm transition-colors font-medium placeholder:text-slate-400 dark:placeholder:text-slate-600 placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-600 dark:focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="w-[200px] h-[100px] bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-[.5rem] p-4 text-sm flex flex-col">
                <span className="font-semibold text-sm mb-2">Top cliente</span>
                <span className="mb-2">
                  Compras: {topCustomers ? topCustomers[0]?.count : 0}
                </span>
                <span className="text-xs flex justify-start items-end gap-1">
                  <Customer width={20} height={20} />
                  {topCustomers ? topCustomers[0]?.customer?.name : ""}{" "}
                  {topCustomers ? topCustomers[0]?.customer?.surname : ""}
                </span>
              </div>
              <div className="w-[200px] h-[100px] bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-[.5rem] p-4 text-sm flex flex-col">
                <span className="font-semibold text-sm mb-2">
                  Top proveedor
                </span>
                <span className="mb-2">
                  Ventas: {topSuppliers ? topSuppliers[0]?.count : 0}
                </span>
                <span className="text-xs flex justify-start items-end gap-1">
                  <Supplier width={20} height={20} />
                  {topSuppliers ? topSuppliers[0]?.supplier?.name : ""}{" "}
                  {topSuppliers ? topSuppliers[0]?.supplier?.surname : ""}
                </span>
              </div>
            </div>
          </article>
          <article className="w-full min-h-[50vh] h-screen max-h-full overflow-x-hidden overflow-y-auto grid grid-cols-1 md:grid-cols-2 mt-5 gap-4 pt-5 pb-[300px]">
            <div className="w-full h-full flex flex-col">
              <div className="w-full h-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow">
                  <ChartBar />
                </div>
                <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow">
                  <ul className="w-full h-full p-4">
                    <p className="text-sm font-semibold mb-2">
                      Top ventas más altas
                    </p>
                    {topProductsAmount
                      ? topProductsAmount.map((product) => (
                          <li
                            key={product.product._id}
                            className="font-semibold bg-slate-100 dark:bg-slate-900 rounded-[.5rem] text-xs px-2 py-1 mb-3 flex flex-col gap-2"
                          >
                            <span className="flex justify-start items-end gap-2">
                              <Product width={16} height={16} />
                              {product.product.name}
                            </span>
                            <span className="flex justify-start items-end gap-2">
                              <Sale width={16} height={16} />
                              {formatterco.format(product.amount)}
                            </span>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
              <div className="w-full h-full mt-5">
                <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow">
                  <ChartColumn />
                </div>
              </div>
            </div>
            <div className=" flex flex-col">
              <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow">
                <ChartPolarArea />
              </div>
              <div className="w-full lg:h-[250px] xl:h-[350px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-[.5rem] shadow mt-5">
                <ChartRadialBar view={"dashboard"} />
              </div>
            </div>
          </article>
        </section>
      )}
    </>
  );
};

export default Dashboard;
