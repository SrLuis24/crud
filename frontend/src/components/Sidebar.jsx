import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
  return (
    <div className="sidebar">
      <Link to={"/"} className="logo">
        <span>C</span>
        <span>R</span>
        <span>U</span>
        <span>D</span>
      </Link>

      <div className="actions">
        <Link to={"/add"} className={`addCard ${location.pathname === "/add" ? "noVisible" : ""}`}>
          +
        </Link>
      </div>

      <div className="links">
        <Link to={"/"} className={location.pathname === "/" ? "active" : ""}>
          Inicio
        </Link>
      </div>
    </div>
  );
}
