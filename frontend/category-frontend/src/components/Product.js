import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardAction: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "none",
    },
  },
  media: {
    height: 200,
    backgroundSize: "cover",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  price: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
  },
  id: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={RouterLink}
        to={`/products/${product.productId}`}
        className={classes.cardAction}
      >
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title={product.name}
        />
        <CardContent className={classes.content}>
          <Box>
            <Typography gutterBottom variant="h6" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" component="p">
              Quantity: {product.quantity}
            </Typography>
            <Typography variant="h6" className={classes.price}>
              ${product.price}
            </Typography>
            <Typography variant="caption" className={classes.id}>
              Product ID: {product.productId}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Product;
