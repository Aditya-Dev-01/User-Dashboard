import React from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const CreateUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const newUser = { id: Date.now(), ...data };
    dispatch(addUser(newUser));
    navigate("/");
  };

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
        Create User
      </Typography>
      <UserForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default CreateUserPage;
