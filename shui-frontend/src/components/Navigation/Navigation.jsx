import './navigation.css';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <section className="section-meny">
      <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
      <div
        className={`navigation-meny ${menuOpen ? 'show-menu' : ''}`}
        ref={navMenuRef}
        onClick={e => e.target === navMenuRef.current && closeMenu()}
      >
        <i className="fa-solid fa-xmark" onClick={closeMenu}></i>
        <ul className="nav-list">
          <li className="nav-list__item"><Link to="/messages" onClick={closeMenu}>MESSAGE</Link></li>
          <li className="nav-list__item"><Link to="/message" onClick={closeMenu}>CREATE MESSAGE</Link></li>
          <li className="nav-list__item"><Link to="/my-profile" onClick={closeMenu}>MY PROFILE</Link></li>
        </ul>
      </div>
    </section>
  );
};

export default Navigation;
