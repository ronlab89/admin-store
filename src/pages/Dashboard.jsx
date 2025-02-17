import { useToggleStore } from "@/store/toggle.store";

import { formatterco } from "@/utils/formatter";

import Heading from "@/components/Heading";
import ChartColumn from "@/components/dashboard/ChartColumn";
import ChartLine from "@/components/dashboard/ChartLine";
import ChartBar from "@/components/dashboard/ChartBar";
import ChartPolarArea from "@/components/dashboard/ChartPolarArea";

const Dashboard = () => {
  const toggleSidebar = useToggleStore((state) => state.toggleSidebar);
  return (
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
            <span>{formatterco.format(0)}</span>
          </Heading>
          <span className="w-fit h-fit bg-teal-100 dark:bg-teal-900 px-4 py-1 rounded-[.5rem]">
            badget con %
          </span>
        </div>
        <div className="flex justify-end items-end gap-2">
          <div className="w-[200px] h-[100px] bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-[.5rem] shadow">
            Top cliente # ventas - numero - cliente
          </div>
          <div className="w-[200px] h-[100px] bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-[.5rem] shadow">
            Top proveedor # compras - numero - cliente
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
                <li className="font-semibold bg-slate-100 dark:bg-slate-900 shadow-sm rounded-[.5rem] px-2 py-1 mb-3">
                  Card 2 grafico
                </li>
                <li className="font-semibold bg-slate-100 dark:bg-slate-900 shadow-sm rounded-[.5rem] px-2 py-1 mb-3">
                  Card 2 grafico
                </li>
                <li className="font-semibold bg-slate-100 dark:bg-slate-900 shadow-sm rounded-[.5rem] px-2 py-1 mb-3">
                  Card 2 grafico
                </li>
                <li className="font-semibold bg-slate-100 dark:bg-slate-900 shadow-sm rounded-[.5rem] px-2 py-1">
                  Card 2 grafico
                </li>
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
            <ChartLine />
          </div>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
