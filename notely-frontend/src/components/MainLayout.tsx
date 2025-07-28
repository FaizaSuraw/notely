import type React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const drawerWidth = 200;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex", bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Header
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />
      <Sidebar open={open} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mt: 6,
          transition: "margin 0.3s ease",
          ml: open ? `${drawerWidth}px` : "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
