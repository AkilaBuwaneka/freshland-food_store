import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Pagination,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Product from "../components/Product";
import ProductService from "../service/ProductService";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: "100vw",
    minWidth: "100vw",
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  filters: {
    display: "flex",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  filterInput: {
    flex: 1,
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
  },
}));

const Products = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters = {
          page: page - 1,
          sortBy: sortBy,
          minPrice: minPrice,
          maxPrice: maxPrice,
          search: search,
        };
        const response = await ProductService.getAllProducts(filters);
        setProducts(response.content || []);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sortBy, minPrice, maxPrice, search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClearFilters = () => {
    setSortBy("");
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    setPage(1);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Products
      </Typography>

      <Box className={classes.filters}>
        <TextField
          className={classes.filterInput}
          label="Sort By"
          select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
        </TextField>

        <TextField
          className={classes.filterInput}
          label="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <TextField
          className={classes.filterInput}
          label="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <TextField
          className={classes.filterInput}
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClearFilters}
          sx={{
            outline: "none",
            boxShadow: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
        >
          Clear Filters
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography variant="body1">No products found.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid>
          <Box className={classes.pagination}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={{
                display: "flex",
                justifyContent: "center",
                button: {
                  color: "#000000",
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  "&:focus": {
                    outline: "none",
                    boxShadow: "none",
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Products;
