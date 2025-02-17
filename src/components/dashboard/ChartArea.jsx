import { useState } from "react";
import Chart from "react-apexcharts";
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/store/dashboard.store";
import moment from "moment/moment";
import "moment/locale/es";

const ChartArea = () => {
  const { profileProducts } = useDashboardStore(
    useShallow((state) => ({
      profileProducts: state.profileProducts,
    }))
  );

  const [state, setState] = useState({
    series: [
      {
        name: "Productos mas vendidos",
        data: profileProducts
          ? profileProducts.map((product) => product.quantity)
          : [0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "text",
        categories: profileProducts
          ? profileProducts.map((product) => product?.product?.name)
          : [""],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={"100%"}
      />
    </>
  );
};

export default ChartArea;
