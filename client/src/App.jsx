import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Public/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Public/Home";
import PaperView from "./pages/Public/PaperView";
import Dashboard from "./pages/Private/Dashboard";
import ManagePaper from "./pages/Private/ManagePaper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/browse" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/paper/:id" element={<PaperView />} />

        <Route path="/manage-paper/:id" element={<ManagePaper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
