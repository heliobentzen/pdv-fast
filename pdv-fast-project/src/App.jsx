import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import OrderStatus from "./pages/OrderStatus";

import PrivateRoute from "./routes/PrivateRoute";
import AppLayout from "./components/layout/AppLayout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ROTAS PÚBLICAS */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ROTAS PRIVADAS */}
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<OrderHistory />} />
            <Route path="/status" element={<OrderStatus />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;


