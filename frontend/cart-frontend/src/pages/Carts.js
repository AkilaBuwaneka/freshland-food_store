import React, { useEffect, useState } from "react";
import axios from "axios";
import Cart from "../components/Cart";
import { getCartsByUserId, createCart } from "../service/CartService";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Pagination,
  Snackbar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import UserService from "../service/UserService";

const Carts = () => {
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [newCartName, setNewCartName] = useState("");
  const [newCartDescription, setNewCartDescription] = useState("");

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
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchCarts = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await getCartsByUserId(user.userId, page - 1, 3);
          setCarts(data.content);
          setTotalPages(data.totalPages);
        } catch (error) {
          console.error("Error fetching carts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCarts();
  }, [user, page]);

  const handleAddCart = async () => {
    setOpenForm(true);
  };

  const handleCreateCart = async () => {
    const newCart = {
      userId: user.userId,
      name: newCartName,
      description: newCartDescription,
      products: [],
    };

    try {
      await createCart(newCart);
      setPage(1);
      const data = await getCartsByUserId(user.userId, 0, 3);
      setCarts(data.content);
      setTotalPages(data.totalPages);
      setSuccessMessage(`Cart "${newCartName}" created successfully!`);
      setOpenSnackbar(true);
      setOpenForm(false);
      setNewCartName("");
      setNewCartDescription("");
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleCartUpdate = (updatedCart) => {
    setCarts(
      carts.map((c) => (c.cartId === updatedCart.cartId ? updatedCart : c))
    );
    setSuccessMessage(`Cart "${updatedCart.name}" updated successfully!`);
    setOpenSnackbar(true);
  };

  const handleCartDelete = async (deletedCartId) => {
    const deletedCart = carts.find((c) => c.cartId === deletedCartId);
    setCarts(carts.filter((c) => c.cartId !== deletedCartId));
    setSuccessMessage(`Cart "${deletedCart.name}" deleted successfully!`);
    setOpenSnackbar(true);
    // Re-fetch the carts after deletion to ensure pagination is correct
    try {
      const data = await getCartsByUserId(user.userId, page - 1, 3);
      setCarts(data.content);
      setTotalPages(data.totalPages);
      // Adjust page number if current page is empty after deletion
      if (data.content.length === 0 && page > 1) {
        setPage(page - 1);
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "94vw",
          height: "80vh",
          mx: "auto",
          position: "relative",
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Your Carts
          </Typography>
          {/* <Button variant="contained" color="primary" onClick={handleAddCart}>
            Add Cart
          </Button> */}
          <Button
            variant="contained"
            onClick={handleAddCart}
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
            <AddShoppingCartIcon />
          </Button>
        </Box>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="60vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {carts.map((cart) => (
              <Box key={cart.cartId} mb={2}>
                <Cart
                  cart={cart}
                  onCartUpdate={handleCartUpdate}
                  onCartDelete={handleCartDelete}
                />
              </Box>
            ))}
          </Box>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={successMessage}
        />
        <Dialog open={openForm} onClose={() => setOpenForm(false)}>
          <DialogTitle>Add New Cart</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Cart Name"
              fullWidth
              value={newCartName}
              onChange={(e) => setNewCartName(e.target.value)}
              sx={{ color: "#07A0FF" }} // Navy blue text
            />
            <TextField
              margin="dense"
              label="Cart Description"
              fullWidth
              value={newCartDescription}
              onChange={(e) => setNewCartDescription(e.target.value)}
              sx={{ color: "#07A0FF" }} // Navy blue text
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenForm(false)}
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
              onClick={handleCreateCart}
              variant="contained"
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
      </Box>
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
    </>
  );
};

export default Carts;
