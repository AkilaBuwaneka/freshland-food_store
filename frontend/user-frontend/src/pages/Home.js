import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Food Store
          </Typography>
          <Button color="inherit" startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url(/images/hero-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: theme.spacing(4),
        }}
      >
        <Container>
          <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
            Fresh & Organic Foods Delivered to Your Doorstep
          </Typography>
          <Button variant="contained" color="secondary" size="large">
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container sx={{ marginTop: theme.spacing(4) }}>
        <Grid container spacing={4}>
          {/* Number of Products Box */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: theme.spacing(3),
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">500+</Typography>
              <Typography variant="h6">Products Available</Typography>
            </Paper>
          </Grid>

          {/* Product Quality Box */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: theme.spacing(3),
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">Premium Quality</Typography>
              <Typography variant="h6">Fresh & Organic</Typography>
            </Paper>
          </Grid>

          {/* Explore Categories Box */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: theme.spacing(3),
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">Explore</Typography>
              <Typography variant="h6">Our Categories</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: theme.spacing(2) }}
              >
                Browse Categories
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Additional Sections */}
      <Container sx={{ marginTop: theme.spacing(4) }}>
        <Grid container spacing={4}>
          {/* Cart Management Box */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: theme.spacing(3),
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">Cart</Typography>
              <Typography variant="h6">Manage Your Cart</Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: theme.spacing(2) }}
              >
                View Cart
              </Button>
            </Paper>
          </Grid>

          {/* Special Offers Box */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: theme.spacing(3),
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">Special Offers</Typography>
              <Typography variant="h6">Exclusive Discounts</Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: theme.spacing(2) }}
              >
                View Offers
              </Button>
            </Paper>
          </Grid>

          {/* About Us Box */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: theme.spacing(3),
                textAlign: "center",
                height: "100%",
              }}
            >
              <Typography variant="h4">About Us</Typography>
              <Typography variant="h6">Learn More About Us</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: theme.spacing(2) }}
              >
                Read More
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: "white",
          padding: theme.spacing(4),
          marginTop: theme.spacing(4),
        }}
      >
        <Container>
          <Typography
            variant={isMobile ? "h5" : "h3"}
            gutterBottom
            align="center"
          >
            Join Our Newsletter for Exclusive Offers
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" color="secondary" size="large">
              Subscribe Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(2),
          marginTop: theme.spacing(4),
        }}
      >
        <Container>
          <Typography variant="body2" color="textSecondary" align="center">
            © 2024 Food Store. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default HomePage;
