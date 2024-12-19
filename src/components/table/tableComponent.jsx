import React, { useState, useMemo, useEffect } from "react";
import { formatDateForDisplay } from "../../utils/formatDate";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  IconButton,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ButtonCustome from "../button/button";
import { getAllElectricTypes } from "@/modules/electricTypes/service";

const TableComponent = ({
  data,
  columns,
  onEdit,
  onDelete,
  presentName,
  selected,
  setSelected,
}) => {
  const [sortDirection, setSortDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerms, setSearchTerms] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: "" }), {})
  );

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && sortDirection === "asc";
    setSortDirection(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (id) => (event) => {
    setSearchTerms({ ...searchTerms, [id]: event.target.value });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(paginatedData.map((row) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleClick = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every(({ id }) =>
        row[id]
          ? row[id]
              .toString()
              .toLowerCase()
              .includes(searchTerms[id].toLowerCase())
          : true
      )
    );
  }, [data, searchTerms, columns]);

  const sortedData = useMemo(() => {
    return filteredData.slice().sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, orderBy, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, page, rowsPerPage]);

  const invoiceds = [
    { value: "true", label: "Đã thông báo" },
    { value: "false", label: "Chưa thông báo" },
  ];

  const nameStatuses = [
    { value: "Đang chờ duyệt", label: "Đang chờ duyệt" },
    { value: "Từ chối", label: "Từ chối" },
    { value: "Hoạt động", label: "Hoạt động" },
    { value: "Chờ kết thúc", label: "Chờ kết thúc" },
    { value: "Kết thúc", label: "Kết thúc" },
  ];
  const [electricTypes, setElectricTypes] = useState([]);
  useEffect(() => {
    if (presentName === "registration-form") {
      getAllElectricTypes().then((response) => {
        if (response.status === 200) {
          setElectricTypes(
            response.data.map((item) => ({
              value: item.name,
              label: item.name,
            }))
          );
        }
      });
    }
  }, [presentName]);
  return (
    <>
      <div className="flex flex-row">
        {columns.map(({ id, label }) => {
          const renderSearchInput = () => (
            <div className="mr-2" key={id}>
              <Typography>Tìm theo {label}</Typography>
              <TextField
                variant="outlined"
                size="small"
                value={searchTerms[id]}
                onChange={handleSearchChange(id)}
                placeholder={`Nhập ${label}`}
                style={{ marginLeft: 8 }}
                sx={{ marginTop: 2 }}
              />
            </div>
          );

          const renderStatusSelect = (options, placeholder) => (
            <div className="mr-2" key={id}>
   
              <FormControl sx={{ width: 200 }} margin="normal">
                <InputLabel>{placeholder}</InputLabel>
                <Select
                  name={id}
                  value={searchTerms[id]}
                  onChange={handleSearchChange(id)}
                  label={placeholder}
                  required
                >
                  <MenuItem value="">
                    Tất cả
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          );

          if (id === "powerMeterId" || id === "employeeIdAndFullName") {
            return renderSearchInput();
          }

          if (id === "nameStatus") {
            return renderStatusSelect(nameStatuses, "Tìm theo trạng thái");
          }
          if (id === "electricTypeName") {
            return renderStatusSelect(electricTypes, "Tìm theo loại điện");
          }

          if (id === "invoiced") {
            return renderStatusSelect(invoiceds, "Tìm theo trạng thái");
          }

          return null;
        })}
      </div>
      <Paper className="overflow-x-auto mt-2">
        <TableContainer className="max-h-screen overflow-auto">
          <MuiTable>
            <TableHead>
              <TableRow>
                {presentName == "unpaid-bill" ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.length === paginatedData.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                ) : null}

                {columns.map(({ id, label }) => (
                  <TableCell key={id}>
                    <TableSortLabel
                      active={orderBy === id}
                      direction={orderBy === id ? sortDirection : "asc"}
                      onClick={() => handleRequestSort(id)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
                {presentName === "electricityPrice" ? (
                  <TableCell />
                ) : (
                  <TableCell>Thực hiện</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {presentName == "unpaid-bill" ? (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selected.includes(row.id)}
                        onChange={() => handleClick(row.id)}
                      />
                    </TableCell>
                  ) : null}

                  {columns.map(({ id }) => (
                    <TableCell
                      style={{
                        color:
                          id === "paymentStatus" ||
                          id === "disabled" ||
                          id === "resignation" ||
                          id === "invoiced"
                            ? row.paymentStatus === true ||
                              row.disabled === false ||
                              row.resignation === false ||
                              row.invoiced === true
                              ? "green"
                              : "red"
                            : id === "nameStatus"
                            ? row.nameStatus === "Hoạt động"
                              ? "green"
                              : row.nameStatus === "Kết thúc"
                              ? "gray"
                              : row.nameStatus === "Từ chối"
                              ? "red"
                              : row.nameStatus === "Chờ kết thúc"
                              ? "orange"
                              : row.nameStatus === "Đang chờ duyệt"
                              ? "blue"
                              : "inherit" // Màu mặc định nếu không thuộc các trạng thái trên
                            : id === "gender"
                            ? row.gender === true
                              ? "pink"
                              : "blue"
                            : "inherit",
                      }}
                      key={id}
                    >
                      {id === "invoiceDate" ||
                      id === "paymentDueDate" ||
                      (id === "paymentDate" && row.paymentDate != null)
                        ? formatDateForDisplay(row[id])
                        : id === "paymentStatus"
                        ? row.paymentStatus === true
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"
                        : id === "disabled"
                        ? row.disabled === true
                          ? "Vô hiệu hóa"
                          : "Hoạt động"
                        : id === "resignation"
                        ? row.resignation === true
                          ? "Đã nghỉ việc"
                          : "Làm việc bình thường"
                        : id === "gender"
                        ? row.gender === true
                          ? "Nữ"
                          : "Nam"
                        : id === "invoiced"
                        ? row.invoiced === true
                          ? "Đã xuất thông báo"
                          : "Chưa xuất thông báo"
                        : row[id]}
                    </TableCell>
                  ))}
                  {presentName === "bill" ? (
                    row.oldIndex != null ? (
                      row.invoiced === false ? (
                        <TableCell>
                          <IconButton onClick={() => onEdit(row)}>
                            <ExitToAppIcon />
                            <Typography>Xuất hóa đơn</Typography>
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell></TableCell>
                      )
                    ) : row.paymentStatus === true ? (
                      <TableCell>
                        <IconButton onClick={() => onEdit(row)}>
                          <LocalPrintshopIcon />
                          <Typography sx={{ color: "green" }}>
                            Xem hóa đơn
                          </Typography>
                        </IconButton>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <IconButton onClick={() => onEdit(row)}>
                          <LocalPrintshopIcon />
                          <Typography sx={{ color: "red" }}>
                            Xem thông báo
                          </Typography>
                        </IconButton>
                      </TableCell>
                    )
                  ) : presentName === "unpaid-bill" ? (
                    row.paymentStatus === true ? (
                      <TableCell></TableCell>
                    ) : (
                      <TableCell
                        sx={{
                          display: "flex",
                          flexDirection: "column", // Sắp xếp các phần tử theo hàng
                          justifyContent: "center", // Căn giữa các phần tử theo hàng
                        }}
                      >
                        <ButtonCustome onClick={() => onEdit(row, 0)}>
                          Thanh toán
                        </ButtonCustome>
                        <IconButton onClick={() => onEdit(row, 1)}>
                          <LocalPrintshopIcon />
                          <Typography sx={{ color: "red" }}>
                            Xem thông báo
                          </Typography>
                        </IconButton>
                      </TableCell>
                    )
                  ) : presentName === "registration-form" ? (
                    <TableCell />
                  ) : presentName === "electricityPrice" ? (
                    <TableCell />
                  ) : (
                    <TableCell>
                      <IconButton onClick={() => onEdit(row)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={
                          row.levelId
                            ? () => onDelete(row.electricTypeId, row.levelId)
                            : () => onDelete(row)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </>
  );
};

export default TableComponent;
