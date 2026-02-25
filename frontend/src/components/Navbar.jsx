import { Link } from 'react-router-dom';
import { useAuth } from '../auth';


const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link className="nav-link" to="/">Products</Link>
        <Link className="nav-link" to="/cart">Cart</Link>
        <Link className="nav-link" to="/orders">Orders</Link>
        {user && user.role === "admin" && (
          <Link className="nav-link" to="/admin">Admin</Link>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user ? (
          <>
            <span className="nav-user">{user.name}</span>
            <button className="button" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;