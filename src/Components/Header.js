import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";

function Header({ setShowCart }) {
  const handleOpenCart = () => {
    setShowCart((prevShowCart) => !prevShowCart);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            TreeRex Store
          </Typography>
          <Hidden smDown>
            {/* Show the button only for larger screens */}
            <Button color="inherit">Products</Button>
          </Hidden>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenCart}>
              <ShoppingCartRoundedIcon />
            </IconButton>
            {/* User Menu */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
