import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ totalItems, itemsPerPage, paginate }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, page) => {
    paginate(page);
  };

  return (
    <MuiPagination
      count={pageCount}
      onChange={handleChange}
      color="primary"
      sx={{ marginTop: "25px", marginLeft: "auto", marginRight: 0 }}
    />
  );
};

export default Pagination;
