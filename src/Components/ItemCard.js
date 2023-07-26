import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ItemCard({
  imgLink,
  genre,
  title,
  price,
  onAddToCart
}) {
  return (
    <Card>
      <CardMedia component="img" image={imgLink} height={160} alt={title} />
      <CardContent>
        <Typography color="text.secondary">{genre}</Typography>
        <Typography variant="h6">{title}</Typography>
        <CardActions>
          <Typography sx={{ flexGrow: 1 }}>Rs {price}</Typography>
          <Button variant="contained" size="medium" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
