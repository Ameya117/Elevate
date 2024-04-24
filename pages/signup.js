import React, {useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import {createUserWithEmailAndPassword,signInWithPopup} from 'firebase/auth';
import { auth, googleProvider } from "@/config/firebase";

const Signup = () => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" });
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

    // try{

    //   const response = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    //   console.log(response)
    // }catch(e){
    //   console.error(e);
    // }
    //api req to "http://localhost:3000/api/signup" , METHOD:POST
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      toast.success("Signed Up Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTimeout(function () {
        router.push("/login");
      }, 3000);
    } else {
      toast.error("Internal Server Error", {
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
  const handleLoginPage = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-row h-[100vh]">
      <div className="w-[65%] mx-auto shadow-2xl overflow-hidden relative hidden lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/login_bg.jpg"
          alt="login background"
        />
        <div className="absolute inset-0 bg-orange-800 bg-opacity-20"></div>
        <div className="flex h-full items-center justify-center relative">
          <div className="flex flex-col justify-center items-center pl-2 w-1/2 lg:w-2/3 ">
            <div className="text-white absolute m-auto w-[50%]">
              <h1 className="z-20 text-7xl font-bold text-white tracking-wide text-center ">
                Create A New Account
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

      <div className="w-[45%] mx-auto  lg:ml-0 lg:w-[35%] h-[100vh] grid place-content-center">
        <form onSubmit={handleOnSubmit} method="POST" className="flex flex-col">
          <h1 className="text-orange-600 font-bold text-7xl text-center mb-24 block lg:hidden">
            Elevate
          </h1>

          <h1 className="text-orange-600 font-bold text-5xl text-center mb-24">
            Signup
          </h1>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ID"
            className="my-3 border-orange-600 border-l-2 bg-slate-100 h-8 w-72 focus:border-0 px-1"
            onChange={handleOnChange}
          />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="my-3 border-orange-600 border-l-2 bg-slate-100 h-8 w-72 focus:border-0 px-1"
            onChange={handleOnChange}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="my-3 border-orange-600 border-l-2 bg-slate-100 h-8 w-72 focus:border-0 px-1"
            onChange={handleOnChange}
            autoComplete="off"
          />
          <h2>
            Already a User?{" "}
            <span
              className="text-orange-800 underline hover:cursor-pointer"
              onClick={handleLoginPage}
            >
              Login
            </span>
          </h2>
          <button
            type="submit"
            className="rounded-xl bg-orange-500 py-1 font-semibold mt-12 text-lg text-white hover:bg-orange-600"
          >
            Signup
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Signup;
