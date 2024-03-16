import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleOnChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    //api req to "http://localhost:3000/api/login" , METHOD:POST
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      // localStorage.setItem("token", json.authtoken);
      toast.success("Login Succesful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("token", json.token);
      setTimeout(function () {
        router.push("/");
      }, 3000);
    } else {
      toast.error(`${json.error}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleNewUser = () => {
    // navigate("/signup");
    router.push("/signup");
  };

  return (
    <div className="flex flex-row h-[100vh]">
      <div className="w-[65%] mx-auto shadow-2xl overflow-hidden relative hidden lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/login_bg.jpg"
          alt="dog training"
        />
        <div className="absolute inset-0 bg-orange-900 bg-opacity-20"></div>
        <div className="flex h-full items-center justify-center relative">
          <div className=" flex flex-col justify-center items-center pl-2 w-1/2 lg:w-2/3 ">
            <div className="text-white absolute m-auto w-[50%]">
              <h2 className="text-white font-light text-xl mx-auto w-fit">
                Nice to see you again
              </h2>
              <h1 className="z-20 text-7xl font-bold text-white tracking-wide text-center ">
                Welcome Back
              </h1>
              <div className="bg-white h-3 w-48 rounded-xl mx-auto my-8"></div>
              <p className="w-[80%] mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, eos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[35%] h-[100vh] grid place-content-center mx-auto">
        <form onSubmit={handleOnSubmit} className="flex flex-col">
          <h1 className="text-orange-600 font-bold text-7xl text-center mb-24 block lg:hidden">
            Elevate
          </h1>
          <h1 className="text-orange-600 font-bold text-5xl text-center mb-24">
            Login
          </h1>
          {/* <label htmlFor="username">Username</label> */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ID"
            className="my-3 border-orange-600 border-l-2 bg-slate-100 h-8 w-72 focus:border-0 px-1"
            onChange={handleOnChange}
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="my-3 border-orange-600 border-l-2 bg-slate-100 h-8 w-72 focus:border-0 px-1"
            autoComplete="off"
            onChange={handleOnChange}
          />
          <h2>
            New user? Sign up{" "}
            <span
              className="text-orange-800 underline hover:cursor-pointer"
              onClick={handleNewUser}
            >
              here
            </span>
            <br />
            <Link
              href="/forgot"
              className="text-orange-500 font-semibold mt-12 text-base  hover:text-orange-600"
            >
              Forgot password?
            </Link>
          </h2>

          <button
            type="submit"
            className="rounded-xl bg-orange-500 py-1 font-semibold mt-12 text-lg text-white hover:bg-orange-600"
          >
            Login
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Login;
