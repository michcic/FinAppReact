import { Chart } from "react-google-charts";
import React from "react";

function FinanceChart(props) {
  return (
    <div style={{ display: "flex", maxWidth: 900 }}>
      <Chart
        width={"1000px"}
        height={"800px"}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={props.data}
        options={{
          title: "My Finances"
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
}

export default FinanceChart;
