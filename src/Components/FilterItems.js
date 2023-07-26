import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function FilterItems({ onFilterChange, isSearchVisible }) {
  const [gender, setGender] = useState({ men: false, women: false });
  const [colour, setColour] = useState({
    red: false,
    blue: false,
    green: false
  });
  const [priceRange, setPriceRange] = useState({
    range1: false,
    range2: false,
    range3: false
  });
  const [type, setType] = useState({
    polo: false,
    hoodie: false,
    basic: false
  });
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [showOptions, setShowOptions] = useState(!isMediumScreen);
  const [filterCardOpen, setFilterCardOpen] = useState(false);

  useEffect(() => {
    onFilterChange({ gender, colour, priceRange, type });
  }, [gender, colour, priceRange, type, onFilterChange]);

  const handleGenderChange = (event) => {
    setGender({ ...gender, [event.target.name]: event.target.checked });
  };

  const handleColourChange = (event) => {
    setColour({ ...colour, [event.target.name]: event.target.checked });
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange({ ...priceRange, [event.target.name]: event.target.checked });
  };

  const handleTypeChange = (event) => {
    setType({ ...type, [event.target.name]: event.target.checked });
  };

  const handleFilterCardToggle = () => {
    setFilterCardOpen(!showOptions);
  };

  const handleFilterIconClick = () => {
    setShowOptions(!showOptions);
  };

  const searchIcon = (
    <IconButton onClick={handleFilterCardToggle} size="small">
      {isSearchVisible ? <SearchIcon /> : <FilterListIcon />}
    </IconButton>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          Shopping Cart
          {isMediumScreen && (
            <IconButton
              onClick={handleFilterIconClick}
              sx={{ ml: 1 }}
              size="small"
            >
              {searchIcon}
            </IconButton>
          )}
        </Typography>

        {(isMediumScreen && showOptions) || !isMediumScreen ? (
          <>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Gender
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender.men}
                    onChange={handleGenderChange}
                    name="men"
                  />
                }
                label="Men"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gender.women}
                    onChange={handleGenderChange}
                    name="women"
                  />
                }
                label="Women"
              />
            </FormGroup>

            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Colour
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={colour.red}
                    onChange={handleColourChange}
                    name="red"
                  />
                }
                label="Red"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={colour.blue}
                    onChange={handleColourChange}
                    name="blue"
                  />
                }
                label="Blue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={colour.green}
                    onChange={handleColourChange}
                    name="green"
                  />
                }
                label="Green"
              />
            </FormGroup>

            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Price Range
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={priceRange.range1}
                    onChange={handlePriceRangeChange}
                    name="range1"
                  />
                }
                label="0 - Rs 250"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={priceRange.range2}
                    onChange={handlePriceRangeChange}
                    name="range2"
                  />
                }
                label="Rs 251-450"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={priceRange.range3}
                    onChange={handlePriceRangeChange}
                    name="range3"
                  />
                }
                label="Rs 450"
              />
            </FormGroup>

            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Type
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type.polo}
                    onChange={handleTypeChange}
                    name="polo"
                  />
                }
                label="Polo"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type.hoodie}
                    onChange={handleTypeChange}
                    name="hoodie"
                  />
                }
                label="Hoodie"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={type.basic}
                    onChange={handleTypeChange}
                    name="basic"
                  />
                }
                label="Basic"
              />
            </FormGroup>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
