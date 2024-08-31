import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system"; // Updated import for styling
import Category from "../components/Category";
import CategoryService from "../service/CategoryService";

// Replace makeStyles with styled from @mui/system or @emotion/styled
const Root = styled(Container)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  maxWidth: "100vw",
  minWidth: "100vw",
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Root maxWidth="lg">
      <Title variant="h4" component="h1">
        Categories
      </Title>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : categories.length === 0 ? (
        <Typography variant="body1">No categories found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={category.categoryId}>
              <Category
                photo={category.categoryImageUrl}
                name={category.name}
                itemCount={category.noOfItems}
                categoryId={category.categoryId}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Root>
  );
};

export default Categories;
