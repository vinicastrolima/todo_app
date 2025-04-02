import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link className="navbar-brand fw-bold" to="/">
          ToDoApp
        </Link>

        <div className="d-flex align-items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link className={`nav-link text-white ${pathname === "/" && "fw-bold"}`} to="/">
                Login
              </Link>
              <Link className={`nav-link text-white ${pathname === "/register" && "fw-bold"}`} to="/register">
                Registrar
              </Link>
            </>
          ) : (
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Sair
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
