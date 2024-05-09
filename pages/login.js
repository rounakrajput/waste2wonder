"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "@/styles/Register.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
4;
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "next-auth/react";

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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data, "data");
    if (!data?.success) {
      toast.error(data?.message);
    } else {
      localStorage.setItem("token", data?.token);
      toast.success(data?.message);
    }
    setForm({
      email: "",
      password: "",
    });
    setTimeout(() => {
      router.push("/");
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
            <FaGithub
              size={30}
              onClick={signIn("github", { callbackUrl: "/", redirect: true })}
            />
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

// export async function getServerSideProps(context) {
//   const token = localStorage.getItem("token");
// }
