"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
4;
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   const userExists = localStorage.getItem("token");
  //   if (userExists) {
  //     router.push("/");
  //   }
  // }, []);

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
    const status = signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: "/dashboard",
      redirect: true,
    });
    console.log(status, "status");
    // if (!data?.success) {
    //   toast.error(data?.message);
    // } else {
    //   localStorage.setItem("token", data?.token);
    //   toast.success(data?.message);
    // }
    setForm({
      email: "",
      password: "",
    });
    // setTimeout(() => {
    //   router.push("/");
    // }, 3000);
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
        <section className={styles.container} id="signup">
          <h1 className={styles.form_title}>Login Here</h1>
          <form method="POST" className={styles.form} onSubmit={handleSubmit}>
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
              value="Login"
              name="signin"
            />
          </form>
          <div className={styles.icons}>
            <FaFacebook color="blue" size={30} />
            <FaInstagram color="hotpink" size={30} />
            {/* <FaGithub
              size={30}
              onClick={signIn("github", { callbackUrl: "/", redirect: true })}
            /> */}
          </div>
          <div className={styles.links}>
            <p>Don't have an account?</p>
            <Link href="/register" id="signInButton">
              Register
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;

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
