import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/book-logo.svg";
import { Library, Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  function navBtn(path, label, icon) {
    const active = location.pathname === path;

    return (
      <button
        onClick={() => {
          navigate(path);
          setOpen(false);
        }}
        className={`flex items-center gap-1 text-sm font-medium transition ${
          active
            ? "text-amber-900"
            : "text-stone-600 hover:text-stone-900"
        }`}
      >
        <span>{icon}</span>
        {/* <Icon size={16} /> */}
        {label}
      </button>
    );
  }

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50 shadow-sm">

      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Brand Section */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-lg">
            <img src={logo} alt="logo" className="w-8 h-8" />
          </div>

          <div className="leading-tight">
            <h1 className="font-semibold text-base">Book Notes</h1>
            <p className="text-xs text-stone-500">
              Track your reading journey 
              {/* • Reflect • Remember */}
            </p>
          </div>
        </div>

        {/* Navigation Section (Desktop) */}
        <div className="hidden sm:flex items-center gap-5">

          {/* {navBtn("/", "Library", "📚")} */}
          {navBtn("/", "Library", <Library size={16} color="#7a462e"/>)}

          <button
            onClick={() => navigate("/add")}
            className="bg-[#7a462e] text-white text-sm px-4 py-2 rounded-lg hover:bg-amber-950 transition"
          >
            + Add Book
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-stone-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="sm:hidden px-4 pb-3 flex flex-col gap-3">
          {navBtn("/", "Library", <Library size={16} color="#7a462e"/>)}

          <button
            onClick={() => {
              navigate("/add");
              setOpen(false);
            }}
            className="bg-[#7a462e] text-white text-sm px-4 py-2 rounded-lg"
          >
            + Add Book
          </button>
        </div>
      )}

    </nav>
  );
}
