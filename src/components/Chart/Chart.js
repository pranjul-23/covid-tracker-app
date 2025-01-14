import React from "react";
import { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import "./Chart.css";

function Chart({ data, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const dailyData = await fetchDailyData();
        setDailyData(dailyData);
      } catch (error) {
        console.erro("Failed to fetch data:", error);
      }
    };
    fetchApi();
  }, []);

  const lineChart =
    dailyData && dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#333fff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [data.confirmed, data.recovered, data.deaths],
          },
        ],
      }}
      options={{
        legend: { display: true },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <div className="chart-container">{country ? barChart : lineChart}</div>
  );
}

export default Chart;
