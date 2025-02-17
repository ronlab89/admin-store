import { useState } from "react";
import Chart from "react-apexcharts";
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/store/dashboard.store";

const ChartRadialBar = ({ view }) => {
  const { topProductsQuantity, productvs, profilevs } = useDashboardStore(
    useShallow((state) => ({
      topProductsQuantity: state.topProductsQuantity,
      productvs: state.productvs,
      profilevs: state.profilevs,
    }))
  );
  const most = productvs?.most?.quantity;
  const least = productvs?.least?.quantity;
  const profileMost = profilevs?.most?.quantity;
  const profileLeast = profilevs?.least?.quantity;

  const [state, setState] = useState({
    series: view === "dashboard" ? [most, least] : [profileMost, profileLeast],
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: "14px",
            formatter: function (seriesName, opts) {
              return (
                seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              );
            },
          },
        },
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels:
        view === "dashboard"
          ? [
              `Más vendido, ${productvs?.most?.product?.name}`,
              `Menos vendido, ${productvs?.least?.product?.name}`,
            ]
          : [
              `Más vendido, ${profilevs?.most?.product?.name}`,
              `Menos vendido, ${profilevs?.least?.product?.name}`,
            ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
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
        type="radialBar"
        height={"100%"}
      />
    </>
  );
};

export default ChartRadialBar;
