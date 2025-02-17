import { useState } from "react";
import Chart from "react-apexcharts";
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/store/dashboard.store";

const ChartPolarArea = () => {
  const { topProductsQuantity } = useDashboardStore(
    useShallow((state) => ({
      topProductsQuantity: state.topProductsQuantity,
    }))
  );
  const [state, setState] = useState({
    series: topProductsQuantity
      ? topProductsQuantity.map((x) => x.quantity)
      : [0],
    options: {
      chart: {
        type: "polarArea",
      },
      labels: topProductsQuantity
        ? topProductsQuantity.map((x) => x.product.name)
        : [""],
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="polarArea"
        height={"100%"}
      />
    </>
  );
};

export default ChartPolarArea;
