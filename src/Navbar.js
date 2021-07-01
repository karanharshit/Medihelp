import React from "react";
import logos from "./logos.svg";

const Navbar = () => {
  return (
    <div className="topnav">
      <img src={logos} className="logo" alt="logo" />
      <a1 href="#">Help </a1>
      <a1 href="#">About</a1>

      <a2 href="#">Sign Up</a2>
      <a2 href="#">Sign In</a2>
    </div>
  );
};

export default Navbar;
