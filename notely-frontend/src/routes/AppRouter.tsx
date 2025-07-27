import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NewNote from "../pages/NewNote";
import ViewNote from "../pages/ViewNote";
import Home from "../pages/Home";
import EditNoteForm from "../pages/EditNote";
import TrashPage from "../pages/TrashPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/new" element={<NewNote />} />
      <Route path="/note/:id" element={<ViewNote />} />
      <Route path="/edit/:id" element={<EditNoteForm />} />
      <Route path="/trash" element={<TrashPage />} />

      

      {/* <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default AppRouter;
