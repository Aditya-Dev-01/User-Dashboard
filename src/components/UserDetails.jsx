import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
}));

const UserDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === Number(id))
  );
  const navigate = useNavigate();

  if (!user) return <p>User not found</p>;

  return (
    <Container maxWidth="md">
      <StyledCard>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            User Details
          </Typography>

          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography variant="h6" color="textSecondary">
                ID
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{user.id}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="h6" color="textSecondary">
                Username
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{user.username}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="h6" color="textSecondary">
                Email
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="h6" color="textSecondary">
                Role
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{user.role}</Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/edit-user/${user.id}`)}
            sx={{ width: "200px", padding: "10px", marginTop: "50px" }}
          >
            Edit User
          </Button>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default UserDetails;
