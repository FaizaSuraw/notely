import { Box } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";

const drawerWidth = 240;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} drawerWidth={drawerWidth} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          transition: "margin 0.3s",
          ml: open ? `${drawerWidth}px` : "64px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
