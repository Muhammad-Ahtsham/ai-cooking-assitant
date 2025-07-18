import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoutes from "./components/Auth";
import Home from "./pages/Home";
import Login from "./pages/login";
import { Signup } from "./pages/Signup";
import Library from "./pages/Library";
import CookingDetails from "./pages/CookingDetails";
import { Toaster } from "react-hot-toast";
import IsUser from "./components/IsUser";

function App() {
  return (
    <Router>
      <Toaster
        toastOptions={{ duration: 2000, style: { fontSize: "0.8rem" } }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          }
        />
        <Route
          path="/history/:historyId"
          element={
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          }
        />
        <Route
          path="/library"
          element={
            <ProtectRoutes>
              <Library />
            </ProtectRoutes>
          }
        />
        <Route path="/recipe/:id" element={<CookingDetails />} />
        <Route
          path="/login"
          element={
            <IsUser>
              <Login />
            </IsUser>
          }
        />
        <Route
          path="/singup"
          element={
            <IsUser>
              <Signup />
            </IsUser>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
