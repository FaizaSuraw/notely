import type React from "react";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useState } from "react";

const drawerWidth = 280;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [open] = useState(true);

  return (
    <Box sx={{ display: "flex", bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Sidebar open={open} drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
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
