import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FileText, Moon, Sun, Menu, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useResume();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/builder', label: 'Builder' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const handleCreate = () => {
    setOpen(false);
    navigate('/builder');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <FileText size={24} />
          </span>
          <span className="brand-text">Resume<span className="brand-accent">Craft</span></span>
        </Link>

        <ul className={`navbar-links ${open ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="mobile-create">
            <button className="btn btn-primary btn-sm" onClick={handleCreate}>
              Create Resume
            </button>
          </li>
        </ul>

        <div className="navbar-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="btn btn-primary btn-sm desktop-create" onClick={handleCreate}>
            Create Resume
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
