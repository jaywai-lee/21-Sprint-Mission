import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Marketplace from "./pages/product/Marketplace";
import AddItem from "./pages/product/AddItem";
import ProductDetail from "./pages/product/ProductDetail";
import Main from "./pages/main/Main";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/items" element={<Marketplace />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/items/:productId" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
