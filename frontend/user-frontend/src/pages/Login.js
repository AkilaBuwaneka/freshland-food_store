import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        const idToken = data.getIdToken().getJwtToken();
        const accessToken = data.getAccessToken().getJwtToken();
        const refreshToken = data.getRefreshToken().getToken();

        // Store the tokens
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", email);
        navigate("/category");
      },
      onFailure: (err) => {
        alert(err);
      },
    });
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
          Login
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
        <Box
          sx={{
            textAlign: "center",
            marginY: 2,
          }}
        >
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
              Don't have an account?{" "}
              <Link component={NavLink} to="/signup">
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
