import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./AuthModal";
import profile from '../assets/profile_pic.png';
import arrow from '../assets/dropdown_icon.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstname");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for token changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token')); // Update token state
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profileImage');
    setToken(null);

    navigate("/");
  };

  return (
    <>
      <div
        className={`flex items-center justify-between text-base py-4 sm:px-[5%] mb-5 bg-white sticky top-0 z-50 shadow-sm ${scrolled ? "bg-opacity-80 backdrop-blur-lg" : ""}`}
      >
        <h1 onClick={() => navigate("/")} className="cursor-pointer text-primary text-3xl font-bold">
          BestBid
        </h1>
        <ul className="hidden md:flex gap-5 items-center font-normal uppercase text-sm">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">Home</li>
          </NavLink>
          <NavLink to="/auctions" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">Auctions</li>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">About</li>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>
            <li className="py-1">Contact</li>
          </NavLink>
        </ul>

        <div className="flex items-center gap-4">
          {token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              {firstName && (
                <span className="text-gray-700 font-normal text-sm">Hi, {firstName}</span> // Display first name
              )}
              <img className='w-8 rounded-full' src={profile} alt="Profile" />
              <img className='w-2.5' src={arrow} alt="Dropdown" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                  <p onClick={() => navigate('my-profile')} className='hover:text-black cursor'>My Profile</p>
                  <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor'>My Appointments</p>
                  <p onClick={handleLogout} className='hover:text-black cursor'>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-primary text-white px-7 py-2 rounded-lg font-semibold hidden md:block cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
