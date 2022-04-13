import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  AppBar,
  Box,
  Menu,
  ImageListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Search", "Manage Booking", "Sign up"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    switch (event.target.id) {
      case "logo":
        navigate("/");
        break;
      case "Search":
        navigate("/search");
        break;
      case "Manage Booking":
        navigate("/manage");
        break;
      case "Sign up":
        navigate("/signup");
        break;
      default:
        throw new Error("ERROR in Switch Case");
        break;
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <ImageListItem
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                margin: "0em 2em",
              }}
              onClick={handleCloseNavMenu}
            >
              <img
                src={"logo"}
                style={{ height: "80px", margin: "0em 1em" }}
                id="logo"
              />
            </ImageListItem>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                height: "80px",
              }}
              // style={{ height: "10vv", margin: "0em 1em" }}
            >
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" id={page}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Nyna Airlines
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    margin: "0em 3em",
                  }}
                  id={page}
                  style={{ fontSize: "20px" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
