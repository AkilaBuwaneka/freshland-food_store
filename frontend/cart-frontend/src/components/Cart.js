import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import { updateCart, deleteCart } from "../service/CartService";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  TextField,
  Collapse,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
} from "@mui/material";
import {
  Edit,
  Save,
  Delete,
  Add,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { generateOrderHash, saveOrder } from "../service/OrderService";

const useStyles = makeStyles((theme) => ({
  cart: {
    margin: "20px 0",
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    border: `1px solid ${theme.palette.divider}`,
    transition: "background-color 0.3s ease",
  },
  expandedCart: {
    border: "2px solid #0185D5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  headerContent: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginRight: theme.spacing(2),
    "& .MuiTextField-root": {
      margin: theme.spacing(1, 0),
    },
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    marginRight: theme.spacing(2),
    width: "100%",
  },
  headerItem: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    marginRight: theme.spacing(2),
    textAlign: "left",
    width: "33.33%",
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    "& .MuiIconButton-root": {
      color: "#0185D5",
      marginLeft: theme.spacing(1),
    },
  },
  cartContent: {
    paddingTop: 0,
  },
  item: {
    borderBottom: "1px solid #ddd",
    padding: "10px 0",
  },
  table: {
    minWidth: 650,
  },
  totalPrice: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
  },
  checkoutButton: {
    marginTop: theme.spacing(2),
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
  },
  insideTableHeader: {
    color: "07A0FF",
  },
  btn: {
    border: "none",
    outline: "none",
    boxShadow: "none",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));

const Cart = ({ cart, onCartUpdate, onCartDelete }) => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCart, setEditedCart] = useState({ ...cart });
  const [totalPrice, setTotalPrice] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = editedCart.products.reduce(
        (sum, product) => sum + product.unitPrice * product.quantity,
        0.0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [editedCart.products]);

  const toggleExpand = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedCart((prevCart) => ({ ...prevCart, [name]: value }));
  };

  const handleUpdate = async (cart) => {
    try {
      const updatedCart = await updateCart(cart.cartId, cart);
      onCartUpdate(updatedCart);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCart(cart.cartId);
      onCartDelete(cart.cartId);
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/products");
  };

  const handleProductDelete = (productId) => {
    const newProducts = editedCart.products.filter(
      (p) => p.productId !== productId
    );
    setEditedCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        products: newProducts,
      };
      handleUpdate(updatedCart);
      return updatedCart;
    });
  };

  const handleProductUpdate = (index, updatedProduct) => {
    const newProducts = [...editedCart.products];
    newProducts[index] = updatedProduct;

    setEditedCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        products: newProducts,
      };
      handleUpdate(updatedCart);
      return updatedCart;
    });
  };

  const loadPayHereSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.payhere) {
        resolve(); // SDK already loaded
      } else {
        const script = document.createElement("script");
        script.src = "https://www.payhere.lk/lib/payhere.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load PayHere SDK"));
        document.head.appendChild(script);
      }
    });
  };

  const handleCheckout = async () => {
    try {
      await loadPayHereSDK();

      const amount = totalPrice;
      const currency = "USD";

      // const response = await axios.post(
      //   "http://localhost:3004/api/v1/orders/generate-hash",
      //   { amount, currency }
      // );
      const response = await generateOrderHash({ amount, currency });
      //console.log(response);
      const hash = response.hash;

      const payment = {
        sandbox: true,
        merchant_id: "1227985",
        return_url: "http://localhost:9000/carts",
        cancel_url: "http://localhost:9000/carts",
        notify_url: "",
        order_id: response.orderId,
        items: "Door bell wireless",
        amount: amount.toString(),
        currency: currency,
        hash: hash,
        first_name: "Saman",
        last_name: "Perera",
        email: "samanp@gmail.com",
        phone: "0771234567",
        address: "No.1, Galle Road",
        city: "Colombo",
        country: "Sri Lanka",
      };

      window.payhere.startPayment(payment);

      payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed successfully. OrderID:", orderId);
        // try {
        //   const response = axios.post(
        //     "http://localhost:3004/api/v1/orders/save",
        //     { orderId, cartId: cart.cartId, totalAmount: amount }
        //   );
        //   //console.log(response);
        //   window.location.reload();
        // } catch (error) {
        //   console.log(error);
        // }
        try {
          const response = saveOrder({
            orderId,
            cartId: cart.cartId,
            totalAmount: amount,
          });
          if (response) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
        //alert("Payment successful! Your order ID is " + orderId);
      };

      // Handle payment failure
      payhere.onError = function onError(error) {
        console.log("Payment failed. Error:", error);
        //alert("Payment failed! Please try again. Error: " + error);
      };

      // Handle payment cancellation/dismissal by the user
      payhere.onDismissed = function onDismissed() {
        console.log("Payment dismissed by user.");
        //alert("Payment process was canceled. You can try again.");
      };
    } catch (error) {
      console.error("Error during checkout or SDK loading:", error);
    }
  };

  return (
    <Card
      className={`${classes.cart} ${isExpanded ? classes.expandedCart : ""}`}
    >
      <CardHeader
        className={classes.header}
        action={
          <div className={classes.buttons}>
            <IconButton
              className={classes.btn}
              onClick={() => {
                if (isEditing) {
                  handleUpdate(editedCart);
                }
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? <Save /> : <Edit />}
            </IconButton>
            <IconButton className={classes.btn} onClick={handleDelete}>
              <Delete />
            </IconButton>
            <IconButton className={classes.btn} onClick={handleAddProduct}>
              <Add />
            </IconButton>
            <IconButton className={classes.btn} onClick={toggleExpand}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </div>
        }
        title={
          isEditing ? (
            <div className={classes.headerContent}>
              <TextField
                name="name"
                value={editedCart.name}
                onChange={handleEditChange}
                placeholder="Cart Name"
                variant="outlined"
                margin="dense"
                fullWidth
              />
              <TextField
                name="description"
                value={editedCart.description}
                onChange={handleEditChange}
                placeholder="Cart Description"
                variant="outlined"
                margin="dense"
                fullWidth
              />
            </div>
          ) : (
            <div className={classes.headerInfo}>
              <div className={classes.headerItem}>
                <Typography variant="h6">{cart.name}</Typography>
              </div>
              <div className={classes.headerItem}>
                <Typography variant="body2" color="textSecondary">
                  Items: {cart.products.length}
                </Typography>
              </div>
              <div className={classes.headerItem}>
                <Typography variant="body2">{cart.description}</Typography>
              </div>
            </div>
          )
        }
      />
      <Collapse in={isExpanded}>
        <CardContent className={classes.cartContent}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="cart items table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="h6"
                      className={classes.insideTableHeader}
                    >
                      Products
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {editedCart.products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">
                      <CartItem
                        product={product}
                        onProductUpdate={(updatedProduct) =>
                          handleProductUpdate(index, updatedProduct)
                        }
                        onProductDelete={handleProductDelete}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            variant="h6"
            className={classes.totalPrice}
          >{`Total Price: $${totalPrice.toFixed(2)}`}</Typography>
          <Button
            variant="contained"
            className={classes.checkoutButton}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Cart;
