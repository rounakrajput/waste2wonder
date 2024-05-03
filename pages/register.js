import Head from "next/head";
import { useState } from "react";
import styles from "@/styles/Register.module.css";

const Register = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  return (
    <>
      <main className="min-h-screen flex justify-center items-center">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          />
        </Head>
        <section className={styles.container} id="signup">
          <h1 className={styles.form_title}>Register Here</h1>
          <form method="post" className={styles.form}>
            <div className={styles.input_group}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="fName"
                id="fName"
                placeholder="First Name"
                required
              />
              <label htmlFor="fName">First Name</label>
            </div>
            <div className={styles.input_group}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="lName"
                id="lName"
                placeholder="Last Name"
                required
              />
              <label htmlFor="lName">Last Name</label>
            </div>
            <div className={styles.input_group}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                id="signup-email"
                placeholder="Enter your Email"
                required
              />
              <label htmlFor="signup-email">Email</label>
            </div>
            <div className={styles.input_group}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                id="signup-password"
                placeholder="Enter your password"
                required
              />
              <label htmlFor="signup-password">Password</label>
            </div>
            <input
              type="submit"
              className={styles.btn}
              value="Sign Up"
              name="signUp"
            />
          </form>
          <div className={styles.icons}>
            <i className="fab fa-google"></i>
            <i className="fab fa-facebook"></i>
          </div>
          <div className={styles.links}>
            <p>Already have an account?</p>
            <a href="/login" id="signInButton">Sign in</a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
