import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Snackbar,
  Pagination,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  createCart,
  getCartById,
  getCartsByUserId,
  updateCart,
} from "../service/CartService";
import AddIcon from "@mui/icons-material/Add";
import UserService from "../service/UserService";
import ProductService from "../service/ProductService";

const useStyles = makeStyles((theme) => ({
  productContainer: {
    minHeight: "90vh",
    maxWidth: "100vw",
    minWidth: "100vw",
    padding: theme.spacing(4),
    backgroundColor: "#f0f8ff",
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productCard: {
    backgroundColor: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRight: "6px solid #1DA1F2",
  },
  productInfo: {
    padding: theme.spacing(8),
  },
  productName: {
    color: "#1976d2",
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  productDescription: {
    color: "#546e7a",
    marginBottom: theme.spacing(2),
  },
  priceStock: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  price: {
    color: "#1976d2",
    fontWeight: 600,
  },
  stock: {
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    fontWeight: 500,
  },
  category: {
    backgroundColor: "#bbdefb",
    color: "#1976d2",
    display: "inline-block",
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  quantityContainer: {
    margin: theme.spacing(2, 0),
  },
  totalPrice: {
    color: "#1976d2",
    fontWeight: 600,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2),
  },
  addToCartBtn: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
    padding: theme.spacing(1),
    fontWeight: 600,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  dialog: {
    minWidth: "30vw",
    padding: theme.spacing(2),
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogButton: {
    margin: theme.spacing(1, 0),
    backgroundColor: "#e3f2fd",
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
  dialogContent: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  cartSelection: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));

const ProductPage = () => {
  const classes = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1.0);
  const [carts, setCarts] = useState([]);
  const [showCartSelection, setShowCartSelection] = useState(false);
  const [newCartName, setNewCartName] = useState("");
  const [newCartDescription, setNewCartDescription] = useState("");
  const [isCreatingNewCart, setIsCreatingNewCart] = useState(false);
  const [user, setUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const email = localStorage.getItem("user");
    const fetchUserDetails = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:3003/api/v1/user/${email}`
        // );
        const response = await UserService.getUserByEmail(email);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        // const response = await fetch(
        //   `http://localhost:3000/api/v1/products/getProductById?productId=${productId}`
        // );
        const response = await ProductService.getProductById(productId);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchUserDetails();
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (user && user.userId) {
      const fetchCarts = async () => {
        try {
          const data = await getCartsByUserId(user.userId, page - 1, 3);
          setCarts(data.content);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Error fetching carts:", error);
        }
      };

      fetchCarts();
    }
  }, [user, page]);

  const handleQuantityChange = (event) => {
    const value = parseFloat(event.target.value);
    setQuantity(value);
  };

  const handleAddToCart = async (cartId) => {
    try {
      const response = await getCartById(cartId);
      if (!response) {
        throw new Error(
          `Error fetching cart ${cartId}: ${response.statusText}`
        );
      }
      const existingCart = await response;

      const updatedProducts = [
        ...existingCart.products,
        {
          productId: product.productId,
          quantity: quantity,
          unitPrice: product.price,
        },
      ];

      const updateResponse = await updateCart(cartId, {
        ...existingCart,
        products: updatedProducts,
      });

      if (!updateResponse) {
        throw new Error(
          `Error updating cart ${cartId}: ${updateResponse.statusText}`
        );
      }

      setShowCartSelection(false);
      setSnackbarMessage("Product added to cart successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbarMessage("Failed to add product to cart.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCreateNewCart = async () => {
    try {
      const response = await createCart({
        userId: user.userId,
        name: newCartName,
        description: newCartDescription,
        products: [],
      });

      if (response) {
        const newCart = await response;
        setCarts([...carts, newCart]);
        handleAddToCart(newCart.cartId);
        setIsCreatingNewCart(false);
        setSnackbarMessage("New cart created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } else {
        throw new Error("Failed to create new cart");
      }
    } catch (error) {
      console.error("Error creating new cart:", error);
      setSnackbarMessage("Failed to create new cart.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const totalPrice = product.price * quantity;

  return (
    <Container
      sx={{
        display: "flex",
      }}
      className={classes.productContainer}
      maxWidth="lg"
    >
      <Paper className={classes.productCard}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className={classes.image}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.productInfo}>
              <Typography variant="h4" className={classes.productName}>
                {product.name}
              </Typography>
              <Typography
                variant="body1"
                className={classes.productDescription}
              >
                {product.description}
              </Typography>
              <div className={classes.priceStock}>
                <Typography variant="h5" className={classes.price}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" className={classes.stock}>
                  In Stock
                </Typography>
              </div>
              <Typography variant="body2" className={classes.category}>
                Category: {product.categoryName}
              </Typography>
              <div className={classes.quantityContainer}>
                <TextField
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg/l</InputAdornment>
                    ),
                    inputProps: { min: 1, step: 0.1 },
                  }}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <Typography variant="h6" className={classes.totalPrice}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Button
                className={classes.addToCartBtn}
                onClick={() => setShowCartSelection(true)}
              >
                Add to Cart
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={showCartSelection}
        onClose={() => setShowCartSelection(false)}
        classes={{ paper: classes.dialog }}
      >
        <div className={classes.dialogTitle}>
          <DialogTitle>Select Cart</DialogTitle>
          <IconButton
            onClick={() => setIsCreatingNewCart(true)}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => setShowCartSelection(false)}
            sx={{
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers>
          <div className={classes.dialogContent}>
            <div className={classes.cartSelection}>
              {carts.map((cart) => (
                <Button
                  key={cart.cartId}
                  onClick={() => handleAddToCart(cart.cartId)}
                  className={classes.dialogButton}
                  fullWidth
                >
                  {cart.name}
                </Button>
              ))}
            </div>
          </div>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            className={classes.pagination}
            sx={{
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
        </DialogContent>
      </Dialog>
      <Dialog
        open={isCreatingNewCart}
        onClose={() => setIsCreatingNewCart(false)}
        classes={{ paper: classes.dialog }}
      >
        <div className={classes.dialogTitle}>
          <DialogTitle>Create New Cart</DialogTitle>
          <IconButton onClick={() => setIsCreatingNewCart(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers>
          <TextField
            label="Cart Name"
            value={newCartName}
            onChange={(e) => setNewCartName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Cart Description"
            value={newCartDescription}
            onChange={(e) => setNewCartDescription(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsCreatingNewCart(false)}
            sx={{
              color: "black",
              border: "none",
              outline: "none",
              boxShadow: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateNewCart}
            className={classes.dialogButton}
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Container>
  );
};

export default ProductPage;
