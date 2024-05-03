import React from 'react'
import styles from "@/styles/Navbar.module.css"

const Navbar = () => {
  return (
    <>
     <nav className={styles.navbar}>
        <div className="logo">
          <a href="index.html">Logo</a>
        </div>
        <ul className={styles.nav_links}>
          <li><a href="index.php">Home</a></li>
          <li><a href="https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/">Events</a></li>
          <li><a href="places.html">Places</a></li>
          <li><a href="about-us.html">About Us</a></li>
          <li><a href="contact-us.html">Account</a></li>
          <li><a href="Dashboard.php">Dashboard</a></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar