import { Chart } from "react-google-charts";
import React from "react";

function YearChart(props) {
  return (
    <div style={{ display: "flex", maxWidth: 400 }}>
      <Chart
        width={"900px"}
        height={"700px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[...props.data]}
        options={{
          hAxis: {
            title: "Time"
          },
          vAxis: {
            title: "Sum of Spendings"
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default YearChart;
