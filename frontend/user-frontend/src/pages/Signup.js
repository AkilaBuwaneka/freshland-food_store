import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserPool from "../UserPool";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
} from "@mui/material";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const role = "USER";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === reEnterPassword) {
      const attributeList = [
        {
          Name: "custom:role",
          Value: role,
        },
      ];

      UserPool.signUp(email, password, attributeList, null, (err, data) => {
        if (err) {
          alert(err);
          console.log(err);
        } else {
          alert(data);

          fetch("http://localhost:3003/api/v1/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              role: role,
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return response.json().then((error) => {
                  throw new Error(error.message);
                });
              }
            })
            .then((result) => {
              alert(
                result.message || "User registered successfully in the database"
              );
            })
            .catch((apiError) => {
              console.error("API error:", apiError);
              alert(
                "An error occurred while registering the user in the database"
              );
            });
        }
      });
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minWidth: "100vw",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Re-enter Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
          required
        />
        <Box sx={{ textAlign: "center", marginY: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: "#1DA1F2",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#07A0FF",
              },
              border: "none",
              outline: "none",
              boxShadow: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Submit
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link component={NavLink} to="/login">
                Login
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
