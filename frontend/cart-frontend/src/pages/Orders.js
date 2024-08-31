import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, CheckCircle } from "@mui/icons-material";
import { getOrderById, getOrdersByUserId } from "../service/OrderService";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  //margin: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "transparent",
    color: theme.palette.primary.dark,
  },
}));

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const userId = "66a5d7930694160e2601314c";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      //   const response = await axios.get(
      //     `http://localhost:3004/api/v1/orders/user/${userId}`
      //   );
      const response = await getOrdersByUserId(userId);
      setOrders(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch orders",
        severity: "error",
      });
      setLoading(false);
    }
  };

  const handleOpenDialog = async (orderId) => {
    try {
      //   const response = await axios.get(
      //     `http://localhost:3004/api/v1/orders/${orderId}`
      //   );
      const response = await getOrderById(orderId);
      setSelectedOrder(response);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch order details",
        severity: "error",
      });
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ marginBottom: 3, color: "black" }}
      >
        Your Orders
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress size={60} />
        </Box>
      ) : (
        <StyledTableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell>Purchase Date</StyledTableCell>
                <StyledTableCell>Total Amount</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <StyledTableRow key={order.orderId}>
                  <StyledTableCell>{order.orderId}</StyledTableCell>
                  <StyledTableCell>
                    {formatDate(order.purchaseTime)}
                  </StyledTableCell>
                  <StyledTableCell>
                    {formatCurrency(order.totalAmount)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <CheckCircle sx={{ color: "success.main" }} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Tooltip title="View Details">
                      <StyledIconButton
                        onClick={() => handleOpenDialog(order.orderId)}
                        sx={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          "&:focus": {
                            outline: "none",
                            boxShadow: "none",
                          },
                        }}
                      >
                        <Visibility />
                      </StyledIconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            //borderRadius: "12px",
            padding: "16px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "rgb(29, 161, 242)" }}>
          Order Details
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order ID: {selectedOrder.orderId}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Purchase Time: {formatDate(selectedOrder.purchaseTime)}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, color: "secondary.main" }}>
                Total Amount: {formatCurrency(selectedOrder.totalAmount)}
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Products
              </Typography>
              <List>
                {selectedOrder.products.map((product) => (
                  <ListItem
                    key={product.productId}
                    sx={{
                      backgroundColor: "action.hover",
                      mb: 1,
                      borderRadius: "8px",
                    }}
                  >
                    <ListItemText
                      primary={`${product.quantity}x ${
                        product.name || "Product"
                      }`}
                      secondary={`Unit Price: ${formatCurrency(
                        product.unitPrice
                      )}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <StyledIconButton
            onClick={handleCloseDialog}
            sx={{
              color: "text.secondary",
              border: "none",
              outline: "none",
              boxShadow: "none",
              "&:focus": {
                outline: "none",
                boxShadow: "none",
              },
            }}
          >
            Close
          </StyledIconButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Orders;
