import { useState } from "react";
import Chart from "react-apexcharts";
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/store/dashboard.store";

const ChartBar = () => {
  const { topSuppliers } = useDashboardStore(
    useShallow((state) => ({
      topSuppliers: state.topSuppliers,
    }))
  );

  const [state, setState] = useState({
    series: [
      {
        data: topSuppliers
          ? topSuppliers.map((supplier) => supplier.count)
          : [],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: topSuppliers
          ? topSuppliers.map((supplier) => supplier.supplier.name)
          : [],
      },
    },
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={"100%"}
      />
    </>
  );
};

export default ChartBar;
