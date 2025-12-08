import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Marketplace from "./pages/Marketplace";
import AddItem from "./pages/AddItem";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/items" element={<Marketplace />} />
        <Route path="/additem" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
