import React from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className="logo">
          <Link href="/">Logo</Link>
        </div>
        <ul className={styles.nav_links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a href="https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/" referrerPolicy="no-referrer" target="_blank">
              Events
            </a>
          </li>
          <li>
            <Link href="/places">Places</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/contact">Account</Link>
          </li>
          <li>
            <Link href="/register">Login</Link>
          </li>

          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
