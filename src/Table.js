import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePagination";

function MyTable(props) {
  const {
    dataWithCat,
    currentSum,
    handleSubmit,
    categories,
    handleChange
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, dataWithCat.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const selectStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const selectClasses = selectStyles();

  const generateCategories = item => {
    //console.log(dataWithCat[item["id"] - 1]["category"])
    var cat = (
      <FormControl className={selectClasses.formControl}>
        <InputLabel htmlFor="category-simple">category</InputLabel>
        <Select
          value={item["category"]}
          name={item["name"] + "|" + item["price"]}
          onChange={handleChange}
        >
          {categories.map((x, y) => (
            <MenuItem value={x} key={y}>
              {x}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

    return cat;
  };

  const generateData = () => {
    const genData = dataWithCat
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(item =>
        item["name"] && item["price"] ? (
          <TableRow>
            <TableCell>{item["name"]}</TableCell>
            <TableCell>{item["price"]}</TableCell>
            <TableCell>{generateCategories(item)}</TableCell>
          </TableRow>
        ) : null
      );
    return genData;
  };

  const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    },
    tableWrapper: {
      overflowX: "auto"
    }
  }));

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Categories</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{generateData()}</TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Sum:</TableCell>
                <TableCell>{currentSum}</TableCell>
                <TableCell />
              </TableRow>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={dataWithCat.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
      <hr />
      <Button variant="contained" color="primary" type="submit">
        Submit/Create Chart
      </Button>
    </form>
  );
}

export default MyTable;
