import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import sailmentor from "../../sailmentor.png";
import { useDispatch } from "react-redux";
import { clearToken } from "../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AnchorIcon from "@mui/icons-material/Anchor";
import EventIcon from "@mui/icons-material/Event";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { setDestinationFilter } from "../../features/filters/filtersSlice";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const AppNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = React.useState(null);

  React.useEffect(() => {
    // Extract the button name from the URL path
    const buttonName = location.pathname.split("/")[1];

    // Set the activeButton state based on the extracted button name
    setActiveButton(buttonName || null);
  }, [location]);
  const imageStyle = {
    // maxWidth: "80%", // Set the maximum width
    // maxHeight: "100%", // Set the maximum height
    width: "35%",
    float: "left",
    alignSelf: "flex-start",
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleButtonClick = (buttonName) => {
    console.log(buttonName);
    setActiveButton(buttonName);

    navigate(`/${buttonName}`);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/signIn");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/sailorExperiences">
          <IconButton size="large" color="inherit">
            <AnchorIcon /> {/* Replace with LinkIcon */}
          </IconButton>
          <p>Experiences</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/bookings">
          <IconButton size="large" color="inherit">
            <EventIcon /> {/* Replace with LinkIcon */}
          </IconButton>
          <p>Bookings</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Link to="/profile">
          <p>Profile</p>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#3FB295", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            backgroundColor: "transparent",
            flexGrow: 1,
            boxShadow: "none",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src={sailmentor} style={imageStyle} />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{
                color: activeButton === "home" ? "#2AA27F" : "white",
              }}
              onClick={() => handleButtonClick("home")}
            >
              <HomeOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              style={{
                color: activeButton === "yachts" ? "#2AA27F" : "white",
              }}
              onClick={() => handleButtonClick("yachts")}
            >
              <SearchIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              style={{
                color: activeButton === "bookings" ? "#2AA27F" : "white",
              }}
              onClick={() => handleButtonClick("bookings")}
            >
              <EventIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => handleButtonClick("sailorExperiences")}
              style={{
                color:
                  activeButton === "sailorExperiences" ? "#2AA27F" : "white",
              }}
            >
              <AnchorIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default AppNavbar;
