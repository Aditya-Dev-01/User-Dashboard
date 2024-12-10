import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, setUsers } from "../redux/userSlice";
import { users as mockData } from "../mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Visibility as DetailsIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const USERS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    if (users.length === 0) {
      dispatch(setUsers(mockData));
    }
  }, [dispatch, users.length]);

  const { currentUsers, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return {
      currentUsers: users.slice(startIndex, endIndex),
      totalPages: Math.ceil(users.length / USERS_PER_PAGE),
    };
  }, [users, currentPage]);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(deleteUser(id));
      }
    },
    [dispatch]
  );

  const handleViewDetails = useCallback(
    (id) => {
      navigate(`/users/${id}`);
    },
    [navigate]
  );

  const handleCreateUser = useCallback(() => {
    navigate("/create-user");
  }, [navigate]);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  const EmptyState = () => (
    <TableRow>
      <TableCell colSpan={5} align="center">
        <Typography variant="body1" color="textSecondary">
          No users found. Click 'Create User' to add new users.
        </Typography>
      </TableCell>
    </TableRow>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        marginTop: "30px",
      }}
    >
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["ID", "Username", "Email", "Role", "Actions"].map(
                  (header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.length === 0 ? (
                <EmptyState />
              ) : (
                currentUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton
                          color="primary"
                          onClick={() => handleViewDetails(user.id)}
                        >
                          <DetailsIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete User">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {users.length > 0 && (
        <Pagination
          totalItems={users.length}
          itemsPerPage={USERS_PER_PAGE}
          currentPage={currentPage}
          paginate={handlePageChange}
          totalPages={totalPages}
        />
      )}
    </Box>
  );
};

export default React.memo(UserList);
