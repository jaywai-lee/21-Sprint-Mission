import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/items" element={<Marketplace />} />
        <Route path="/" element={<Navigate to="/items" replace />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
