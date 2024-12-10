import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";
import UserForm from "../components/UserForm";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const EditUserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  const handleSubmit = (data) => {
    dispatch(updateUser({ id: Number(id), ...data }));
    navigate("/");
  };

  if (!user) return <p>User not found</p>;

  return (
    <Box
      sx={{
        maxWidth: "500px",
        margin: "auto",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Edit User
      </Typography>
      <UserForm initialData={user} onSubmit={handleSubmit} />
    </Box>
  );
};

export default EditUserPage;
