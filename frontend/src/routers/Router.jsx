import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Sidebar from "../components/Sidebar";
import Error404 from "../pages/Error404";
import AddCard from "../pages/AddCard";
import UpdateCard from "../pages/UpdateCard";
import Nota from "../pages/Nota";

export default function Router() {
  return (
    <BrowserRouter>
        <Sidebar />
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/add" element={ <AddCard /> } />
            <Route path="/edit/:id" element={ <UpdateCard /> } />
            <Route path="/view/:id" element={ <Nota /> }  />
            <Route path="/view" element={ <Home /> } />
            <Route path="/*" element={ <Error404 /> } />
        </Routes>
    </BrowserRouter>
  )
}
