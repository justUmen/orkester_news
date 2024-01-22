"use client";
import React, { useState } from "react";
import {
  SwipeableDrawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TerminalIcon from "@mui/icons-material/Terminal";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import CottageIcon from "@mui/icons-material/Cottage";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

function LeftSideMenu() {
  const [open, setOpen] = useState(false);
  const router = usePathname();

  const toggleDrawer =
    (open: boolean | ((prevState: boolean) => boolean)) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const links = [
    { name: "Home", href: "/", icon: <CottageIcon /> },
    { name: "Linux", href: "/linux", icon: <TerminalIcon /> },
    { name: "Interpol", href: "/interpol", icon: <LocalPoliceIcon /> },
  ];

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {links.map((link) => (
          <Link href={link.href} key={link.name} passHref>
            <ListItem
              style={{
                backgroundColor: router === link.href ? "#e3f2fd" : "transparent",
                color: router === link.href ? "#1565c0" : "black",
                cursor: "pointer",
                padding: "10px 20px",
                borderRadius: "5px",
                margin: "5px 0",
                transition: "background-color 0.3s",
              }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        onClick={handleToggle}
        style={{ marginTop: "10px", marginLeft: "10px" }}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div>
            {list()}
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default LeftSideMenu;
