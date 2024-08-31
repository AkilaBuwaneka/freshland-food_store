import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import axios from "axios";
//import ProductService from "../service/ProductService";
import ProductService from "../service/ProductService";

const CartItem = ({ product, onProductUpdate, onProductDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await ProductService.getProductById(product.productId);
        //console.log(response);
        setProductDetails(response);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [product.productId]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onProductUpdate(editedProduct);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProduct({ ...product });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onProductDelete(product.productId);
  };

  if (!productDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <CircularProgress />
      </Box>
    );
  }

  const totalPrice = product.quantity * product.unitPrice;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={1}
      p={1}
      bgcolor="#f9f9f9"
      borderRadius="4px"
      boxShadow={1}
    >
      {isEditing ? (
        <Box display="flex" alignItems="center" flexGrow={1}>
          <TextField
            name="productId"
            value={editedProduct.productId}
            onChange={handleEditChange}
            margin="dense"
            variant="outlined"
            size="small"
            disabled
            sx={{ mr: 1, width: "20%" }}
          />
          <TextField
            name="quantity"
            value={editedProduct.quantity}
            onChange={handleEditChange}
            margin="dense"
            variant="outlined"
            size="small"
            sx={{ mr: 1, width: "20%" }}
          />
          <TextField
            name="unitPrice"
            value={editedProduct.unitPrice}
            onChange={handleEditChange}
            margin="dense"
            variant="outlined"
            size="small"
            disabled
            sx={{ mr: 1, width: "20%" }}
          />
          <Box display="flex" gap={1}>
            <IconButton
              variant="contained"
              color="primary"
              onClick={handleSave}
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
              <Save />
            </IconButton>
            <IconButton
              variant="outlined"
              color="error"
              onClick={handleCancel}
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
              <Close />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <Box display="flex" flexGrow={1} alignItems="center">
          <Avatar
            src={productDetails.imageUrl}
            alt={productDetails.name}
            sx={{ mr: 1, width: 56, height: 56 }}
          />
          <Box display="flex" flexGrow={1}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              sx={{ width: "20%" }}
            >
              <Typography variant="body2">{productDetails.name}</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              sx={{ width: "20%" }}
            >
              <Typography variant="body2">
                Quantity: {product.quantity}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              sx={{ width: "20%" }}
            >
              <Typography variant="body2">
                Unit Price: ${product.unitPrice.toFixed(2)}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              sx={{ width: "20%" }}
            >
              <Typography variant="body2">
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={1} ml="auto">
            <IconButton
              color="primary"
              onClick={handleEdit}
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
              <Edit />
            </IconButton>
            <IconButton
              color="error"
              onClick={handleDelete}
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
              <Delete />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartItem;
