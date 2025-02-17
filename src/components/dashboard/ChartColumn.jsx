import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/store/dashboard.store";

const ChartColumn = () => {
  const { topCustomers } = useDashboardStore(
    useShallow((state) => ({
      topCustomers: state.topCustomers,
    }))
  );
  const [state, setState] = useState({
    series: [
      {
        name: "Compras",
        data: topCustomers
          ? topCustomers.map((customer) => customer.count)
          : [],
      },
    ],
    options: {
      annotations: {
        points: [
          {
            x: "Bananas",
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0",
              },
              text: "Clientes con más compras",
            },
          },
        ],
      },
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"],
        },
      },
      xaxis: {
        labels: {
          rotate: -45,
        },
        data: topCustomers
          ? topCustomers.map((customer) => customer.customer.name)
          : [],
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Compras",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100],
        },
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

export default ChartColumn;
