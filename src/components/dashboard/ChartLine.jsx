import { useState } from "react";
import Chart from "react-apexcharts";
import { useShallow } from "zustand/shallow";
import { useDashboardStore } from "@/store/dashboard.store";
import moment from "moment/moment";
import "moment/locale/es";

const ChartLine = () => {
  const { profileProducts, consultDate } = useDashboardStore(
    useShallow((state) => ({
      profileProducts: state.profileProducts,
      consultDate: state.consultDate,
    }))
  );

  const [state, setState] = useState({
    series: [
      {
        name: `Mas vendido - ${moment(consultDate).format("MMMM")}`,
        data: [profileProducts?.quantity],
      },
      {
        name: `Menos vendido - ${moment(consultDate).format("MMMM")}`,
        data: [profileProducts?.quantity],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.5,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#77B6EA", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month",
        },
      },
      yaxis: {
        title: {
          text: "Temperature",
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  return (
    <>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        height={"100%"}
      />
    </>
  );
};

export default ChartLine;
