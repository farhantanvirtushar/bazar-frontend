/* eslint-disable */
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./style.css";

import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClassIcon from "@mui/icons-material/Class";
import CategoryIcon from "@mui/icons-material/Category";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { NavItem } from "../../../models/NavItem";

export default function AdminLayout() {
  const [open, setopen] = useState(window.innerWidth > 600);
  const [mobileScreen, setmobileScreen] = useState(window.innerWidth < 600);

  const sideNavItems: NavItem[] = [
    {
      name: "Dashboard",
      url: "dashboard",
      icon: <DashboardIcon />,
    },
    {
      name: "Departments",
      url: "departments",
      icon: <ClassIcon />,
    },
    {
      name: "Categories",
      url: "categories",
      icon: <CategoryIcon />,
    },
    {
      name: "Products",
      url: "products",
      icon: <StorefrontIcon />,
    },
    {
      name: "Orders",
      url: "orders",
      icon: <LocalShippingIcon />,
    },
  ];

  const toggleDrawer = () => {
    setopen(!open);
  };
  const closeDrawer = () => {
    if (mobileScreen) {
      setopen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 600) {
      setmobileScreen(true);
    } else {
      setmobileScreen(false);
    }
  };

  window.addEventListener("resize", handleResize);

  return (
    <div>
      <Drawer
        variant={window.innerWidth > 600 ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClick={closeDrawer}
      >
        <div className="title">Bazar Admin Panel</div>
        <List className="side-bar">
          {sideNavItems.map((navItem: NavItem, index) => (
            <ListItem key={navItem.name} disablePadding className="nav-item">
              <NavLink to={navItem.url} className="nav-link">
                <ListItemButton>
                  <ListItemIcon className="nav-icon">
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={navItem.name} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div
        className={
          open && !mobileScreen ? "main-content-shrink" : "main-content"
        }
      >
        <div className="topbar">
          <IconButton
            aria-label="menu"
            className="menu-button"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <div className="topbar-group"></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
