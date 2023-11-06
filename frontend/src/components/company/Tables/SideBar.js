import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SailingIcon from "@mui/icons-material/Sailing";
import AnchorIcon from "@mui/icons-material/Anchor";
import HistoryIcon from "@mui/icons-material/History";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import "../../common/styles.css";
import sailmentor from "../../../sailmentor.png";
import logo from "../../images/blackLogo.png";
import { Paper } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const drawerWidth = 240;

export const SideBar = (props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  console.log(props);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const imageStyle = {
    // maxWidth: "80%", // Set the maximum width
    // maxHeight: "100%", // Set the maximum height
    width: "80%",
    alignSelf: "flex-start",
  };

  const drawer = (
    <div>
      <Paper
        elevation={6}
        sx={{
          marginTop: "5%",
          marginLeft: "5%",
          width: "90%",
          height: "95vh",
          backgroundColor: "#2D2D2E",

          borderRadius: "12px 12px 12px 12px", // Adjust the border-radius as needed
          overflow: "hidden", // Hide overflow content
        }}
      >
        <Typography noWrap component="div" sx={{ marginBottom: "15%" }}>
          <img src={logo} style={imageStyle} />
        </Typography>
        <List>
          {[
            { text: "Yachts", icon: <AnchorIcon />, link: "companyYachts" },
            {
              text: "Bookings",
              icon: <MenuBookIcon />,
              link: "companyBookings",
            },
            { text: "History", icon: <HistoryIcon /> },
          ].map((item, index) => (
            <Link to={`/` + item.link} className="link-no-formatting">
              <ListItem
                sx={{
                  color: "white",
                  paddingInline: "5%",
                }}
                key={item.text}
                disablePadding
              >
                <ListItemButton
                  sx={{
                    borderRadius: "10px",
                    "&.Mui-selected": {
                      backgroundColor: "#3FB295",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#3FB295",
                    },
                    ":hover": {
                      backgroundColor: "#3FB295",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </div>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#3FB295",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <IconButton
          color="#3FB295"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            display: { sm: "none" },
            width: "100%",
          }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "none", sm: "none" },
            border: "none",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default SideBar;
