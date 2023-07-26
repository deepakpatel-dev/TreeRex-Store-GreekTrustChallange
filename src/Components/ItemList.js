import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ItemCard from "./ItemCard";
import SearchField from "./SearchField";
import FilterItems from "./FilterItems";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useItemContext } from "./ItemContext";
import { Box, Typography } from "@mui/material";
export default function ItemSearcher() {
  const {
    filteredItems,
    setFilteredItems,
    cartItems,
    setCartItems
  } = useItemContext();
  const [title, setTitle] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const [filterOptions, setFilterOptions] = useState({
    gender: { men: false, women: false },
    colour: { red: false, blue: false, green: false },
    priceRange: { range1: false, range2: false, range3: false },
    type: { polo: false, hoodie: false, basic: false }
  });

  useEffect(() => {
    axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    ).then((res) => {
      setAllItems(res.data);
      setFilteredItems(res.data);
    });
  }, [setFilteredItems]);

  useEffect(() => {
    if (title.trim() === "") {
      setItemsList(allItems);
      setFilteredItems(allItems);
    } else {
      const filteredItems = itemsList.filter((item) =>
        item.name.toLowerCase().includes(title.toLowerCase())
      );
      setItemsList(filteredItems);
      setFilteredItems(filteredItems);
    }
  }, [filterOptions, allItems, title]);

  useEffect(() => {
    filterItems();
  }, [filterOptions, allItems]);

  const handleAddToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const filterItems = () => {
    const { gender, colour, priceRange, type } = filterOptions;
    const filteredItems = allItems.filter((item) => {
      const isGenderMatched =
        (!gender.men && !gender.women) ||
        (gender.men && item.gender === "Men") ||
        (gender.women && item.gender === "Women");

      const isColourMatched =
        (!colour.red && !colour.blue && !colour.green) ||
        (colour.red && item.colour === "Red") ||
        (colour.blue && item.colour === "Blue") ||
        (colour.green && item.colour === "Green");

      const isPriceRangeMatched =
        (!priceRange.range1 && !priceRange.range2 && !priceRange.range3) ||
        (priceRange.range1 && item.price <= 250) ||
        (priceRange.range2 && item.price > 250 && item.price <= 450) ||
        (priceRange.range3 && item.price > 450);

      const isTypeMatched =
        (!type.polo && !type.hoodie && !type.basic) ||
        (type.polo && item.type === "Polo") ||
        (type.hoodie && item.type === "Hoodie") ||
        (type.basic && item.type === "Basic");

      return (
        isGenderMatched &&
        isColourMatched &&
        isPriceRangeMatched &&
        isTypeMatched
      );
    });

    setFilteredItems(filteredItems);
  };
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <div>
      <Box className="item-searcher-container">
        <Grid container spacing={2}>
          {/* FilterItems component */}
          <Grid item xs={12} sm={6} md={3}>
            <FilterItems
              onFilterChange={setFilterOptions}
              isSearchVisible={!isMediumScreen}
            />
          </Grid>
          {/* Item Cards */}
          <Grid item container xs={12} sm={6} md={9} spacing={2}>
            <Grid item xs={12}>
              <SearchField value={title} changeValue={setTitle} />
            </Grid>
            {filteredItems.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1">No items found.</Typography>
              </Grid>
            ) : (
              filteredItems.map((item) => {
                const { id, imageURL, genre, name, price } = item;
                return (
                  <Grid item xs={12} sm={6} md={4} key={id}>
                    <ItemCard
                      searchText={title}
                      imgLink={imageURL}
                      genre={genre}
                      title={name}
                      price={price}
                      onAddToCart={() => handleAddToCart(item)}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
