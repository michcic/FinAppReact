import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

function MonthPicker(props) {
  const { date, setDate } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker views={["month", "year"]} value={date} onChange={setDate} />
    </MuiPickersUtilsProvider>
  );
}

export default MonthPicker;
