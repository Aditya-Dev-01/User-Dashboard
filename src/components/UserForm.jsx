import React, { useEffect, useRef } from "react";
import { TextField, Button, MenuItem, Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ initialData, onSubmit }) => {
  const prevInitialDataRef = useRef();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "user",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    if (initialData && initialData !== prevInitialDataRef.current) {
      formik.setValues(initialData);
      prevInitialDataRef.current = initialData;
    }
  }, [initialData, formik]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        fullWidth
        margin="normal"
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        fullWidth
        margin="normal"
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        select
        label="Role"
        name="role"
        value={formik.values.role}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.role && Boolean(formik.errors.role)}
        helperText={formik.touched.role && formik.errors.role}
        fullWidth
        margin="normal"
        required
      >
        <MenuItem value="user">User</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "16px" }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;
