import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = localStorage.getItem("user_name")
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("user_name")
    alert("Logged Out!")
    navigate("/")
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: "/",     label: "Home" },
    { to: "/crud", label: "Records" },
  ]

  return (
    <nav className="bg-slate-900 px-6 py-3 flex items-center justify-between relative">

      {/* Logo */}
      <span className="text-white font-semibold text-base tracking-tight">
        ⚡ DataForge
      </span>

      {/* Desktop Links — center */}
      <div className="hidden md:flex gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(link.to)
                ? "bg-slate-700 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-3">
        {!user ? (
          <Link
            to="/login"
            className="bg-white text-slate-900 hover:bg-slate-100 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            {/* Avatar + username */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                {JSON.parse(user)?.user_name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <span className="text-slate-400 text-sm">
                {JSON.parse(user)?.user_name}
              </span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Mobile — hamburger */}
      <div className="flex md:hidden items-center gap-2">
        {!user ? (
          <Link
            to="/login"
            className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-semibold"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium"
          >
            Logout
          </button>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-400 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-800 border-t border-slate-700 flex flex-col px-4 py-2 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`py-2.5 text-sm font-medium border-b border-slate-700 last:border-0 transition-colors ${
                isActive(link.to) ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

    </nav>
  )
}

export default Nav