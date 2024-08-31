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
import { styled } from "@mui/system";

const RootCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CardAction = styled(CardActionArea)({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "none",
  },
});

const Media = styled(CardMedia)({
  height: 200,
  backgroundSize: "cover",
});

const Content = styled(CardContent)({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const Category = ({ photo, name, itemCount, categoryId }) => {
  return (
    <RootCard>
      <CardAction component={RouterLink} to={`/category/${categoryId}`}>
        <Media image={photo} title={name} />
        <Content>
          <Box>
            <Typography gutterBottom variant="h6" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Items: {itemCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary" component="p">
              Category ID: {categoryId}
            </Typography>
          </Box>
        </Content>
      </CardAction>
    </RootCard>
  );
};

export default Category;
