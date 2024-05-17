import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session, "session");
  }, []);
  return (
    <>
      <nav className={styles.navbar}>
        <div className="logo">
          <Link href="/" className="font-bold text-xl px-14">Waste2Wonder</Link>
        </div>
        <ul className={styles.nav_links}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <a
              href="https://www.pmindia.gov.in/en/major_initiatives/swachh-bharat-abhiyan/"
              referrerPolicy="no-referrer"
              target="_blank"
            >
              Events
            </a>
          </li>
          <li>
            <Link href="/places">Places</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          {!session && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}

          {session && (
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
