import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CSVReader from "react-csv-reader";
import FinanceChart from "./FinanceChart";
import YearChart from "./YearChart";
import MyTable from "./Table";
import MonthPicker from "./MonthPicker";
import Panel from "./Panel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 2,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

const getMonthYearFromDate = date => {
  return date.getMonth() + 1 + "/" + date.getFullYear();
};

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const [fileData, setFileData] = useState([]);
  const [dataWithCat, setDataWithCat] = useState([]);
  const [date, setDate] = useState(new Date());

  const [yearData, setYearData] = useState([["x", "spendings"]]);
  const [currentSum, setCurrentSum] = useState(0);
  const [loadYearChart, setLoadYearChart] = useState(false);
  const [typeOfMoney, setTypeOfMoney] = useState("expenses");

  const categories = [
    "shopping",
    "entertainment",
    "holiday",
    "rent and bills",
    "sport",
    "other"
  ];
  const [chartData, setCharData] = useState([
    ["Categories", "Sum of spended money"],
    [categories[0], 0],
    [categories[1], 0],
    [categories[2], 0],
    [categories[3], 0],
    [categories[4], 0],
    [categories[5], 0]
  ]);
  const [fileLoaded, setFileLoaded] = useState(false);

  useEffect(() => {
    if (fileData.length > 0 && !fileLoaded) {
      const monthYear = getMonthYearFromDate(date);
      var sum = 0;
      var id = 0;

      // show only rows with the choosen month
      var dataWithChoosenDate = fileData.filter(item =>
        item[0].includes(monthYear)
      );

      // show only expenses or salary
      var filterType =
        typeOfMoney === "expenses"
          ? dataWithChoosenDate.filter(item => item[3] < 0)
          : dataWithChoosenDate.filter(item => item[3] > 0);

      var newDataWithCat = filterType.map(item => {
        sum += Math.abs(item[3]);
        id++;
        return {
          id: id,
          name: item[2],
          price: Math.abs(item[3]), //it needs to be positive
          category: categories[0]
        };
      });

      setCurrentSum(parseFloat(sum.toFixed(2)));
      setDataWithCat(newDataWithCat);
      //setFileLoaded(true)
    }
  }, [fileData, date, typeOfMoney]);

  const handleFiles = file => {
    const newFile = file.filter(item => {
      return item[0] !== "";
    });
    newFile.shift(); // remove headers

    setFileData(newFile);
  };

  const handleDataChange = event => {
    const { name, value } = event.target;
    const nameAndPrice = name.split("|");

    setDataWithCat(prevState => {
      const newState = prevState.map(item => {
        if (item.name === nameAndPrice[0]) {
          item.category = value;
        }
        return item;
      });
      return newState;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    var newCharTableCellata = chartData.map(item => {
      //match category
      var cat = dataWithCat.filter(d => d["category"] === item[0]);

      if (cat.length > 0) {
        item[1] = cat.reduce(
          (total, currentValue) => total + parseFloat(currentValue["price"]),
          0
        );
      }

      return item;
    });
    setCharData(newCharTableCellata);
    setYearData(prevState => {
      prevState.push([date, currentSum]);

      return prevState;
    });
    setLoadYearChart(true);
  };

  function handleRadioChange(event) {
    setTypeOfMoney(event.target.value);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Table" />
            <Tab label="Month Summary" />
            <Tab label="Year Summary" />
          </Tabs>
        </Grid>
        <Grid item xs={9}>
          <Panel value={value} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <MonthPicker date={date} setDate={setDate} />
              </Grid>
              <Grid>
                <RadioGroup
                  aria-label="typeOfMoney"
                  name="typeOfMoney"
                  className={classes.group}
                  value={typeOfMoney}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="expenses"
                    control={<Radio />}
                    label="Expenses"
                  />
                  <FormControlLabel
                    value="salary"
                    control={<Radio />}
                    label="Salary"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={6}>
                <CSVReader
                  cssClass="csv-reader-input"
                  label="Select CSV"
                  onFileLoaded={handleFiles}
                  inputId="ObiWan"
                  inputStyle={{ color: "red" }}
                />
              </Grid>
              <Grid item xs={9}>
                <MyTable
                  dataWithCat={dataWithCat}
                  handleChange={handleDataChange}
                  handleSubmit={handleSubmit}
                  categories={categories}
                  currentSum={currentSum}
                />
              </Grid>
            </Grid>
          </Panel>
          <Grid item xs={9}>
            <Panel value={value} index={1}>
              <FinanceChart data={chartData} />
            </Panel>
          </Grid>
          <Grid item xs={9}>
            <Panel value={value} index={2}>
              {loadYearChart ? <YearChart data={yearData} /> : ""}
            </Panel>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
