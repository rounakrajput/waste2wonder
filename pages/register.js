"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import toast, { Toaster } from "react-hot-toast";
4;
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form, "form");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!data?.success) {
      toast.error(data?.message);
    } else {
      toast.success(data?.message);
    }
    setForm({
      fname: "",
      lname: "",
      email: "",
      password: "",
    });
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <>
      <main className="min-h-screen flex justify-center items-center bg-white text-black">
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
        />
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          />
        </Head>
        <section className={styles.container} id="signup">
          <h1 className={styles.form_title}>Register Here</h1>
          <form method="POST" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input_group}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="fname"
                id="fName"
                placeholder="First Name"
                onChange={handleChange}
                value={form.fname}
                required
              />
              <label htmlFor="fName">First Name</label>
            </div>
            <div className={styles.input_group}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="lname"
                id="lName"
                placeholder="Last Name"
                onChange={handleChange}
                value={form.lname}
                required
              />
              <label htmlFor="lName">Last Name</label>
            </div>
            <div className={styles.input_group}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                onChange={handleChange}
                value={form.email}
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
                onChange={handleChange}
                value={form.password}
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
            <a href="/login" id="signInButton">
              Sign in
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
