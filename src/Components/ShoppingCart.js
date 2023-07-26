import React from "react";
import { useItemContext } from "./ItemContext";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function ShoppingCart() {
  const { cartItems, setCartItems } = useItemContext();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      handleRemoveItem(itemId); // If new quantity is 0, remove the item
    }
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box mt={2}>
      <Typography variant="h5">Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Box mt={2}>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.imageURL}
                    alt={item.title}
                    height={140}
                    sx={{ objectFit: "contain" }}
                  />
                  <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="subtitle1">
                      Price: Rs {item.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      <RemoveIcon />
                    </Button>
                    <Typography variant="body1" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      <AddIcon />
                    </Button>
                  </CardActions>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box mt={2}>
        <Typography variant="h6">Total Amount: Rs {totalAmount}</Typography>
      </Box>
    </Box>
  );
}
