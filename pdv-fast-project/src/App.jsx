import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import OrderStatus from "./pages/OrderStatus";

import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ROTAS PRIVADAS */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/status"
          element={
            <PrivateRoute>
              <OrderStatus />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
