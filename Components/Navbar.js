import React from "react";
import styles from "@/styles/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className="logo">
          <a href="index.html">Logo</a>
        </div>
        <ul className={styles.nav_links}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/">
              Events
            </a>
          </li>
          <li>
            <a href="/places">Places</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Account</a>
          </li>
          <li>
            <a href="/register">Login</a>
          </li>

          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
