import React, { useState, useRef } from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Navbar = () => {
  const ref = useRef();
  const [icon, setIcon] = useState("bars");
  const [selected, setSelected] = useState(false);
  const handleIcon = () => {
    icon === "bars" ? setIcon("close") : setIcon("bars");
  };
  let element;
  if (icon === "bars") {
    element = <FaBars />;
  } else {
    element = <IoCloseOutline />;
  }
  const handleNavbar = () => {
    let ul = document.querySelector("ul");
    icon === "close"
      ? (ul.classList.add("left-0"), ul.classList.remove("-left-[100%]"))
      : (ul.classList.remove("left-0"), ul.classList.add("-left-[100%]"));
  };
  const handleOnClickLink = () => {
    let ul = document.querySelector("ul");
    icon === "close"
      ? (ul.classList.remove("left-0"),
        ul.classList.add("-left-[100%]"),
        setIcon("bars"))
      : (ul.classList.add("left-0"), ul.classList.remove("-left-[100%]"));
  };
  const handleSidebar = () => {
    console.log("hi");
    const sidebar1 = document.querySelector(".sidebar1");
    const sidebar2 = document.querySelector(".sidebar2");
    !selected
      ? (setSelected(true),
        sidebar1.classList.remove("-right-[150%]"),
        sidebar1.classList.add("right-0"),
        sidebar2.classList.remove("-right-[150%]"),
        sidebar2.classList.add("right-0"))
      : (setSelected(false),
        sidebar1.classList.add("-right-[150%]"),
        sidebar1.classList.remove("right-0"),
        sidebar2.classList.add("-right-[150%]"),
        sidebar2.classList.remove("right-0"));
  };
  return (
    <>
      <nav className="h-16 lg:h-20 shadow-md w-full lg:flex lg:flex-row lg:justify-between bg-white sticky top-0 z-[10]">
        <input type="checkbox" id="check" hidden onClick={handleNavbar} />
        <label
          htmlFor="check"
          className="float-right lg:hidden relative top-5 mr-4"
        >
          <span onClick={handleIcon} className="text-xl">
            {" "}
            {element}
          </span>
        </label>
        <Link
          href="/"
          className="font-bold text-2xl my-auto hover:cursor-pointer ml-4 relative top-4 lg:top-0"
        >
          Elevate
        </Link>
        <ul className="block lg:hidden text-center space-y-5 bg-blue-50 h-[100vh] w-[100vw] lg:relative font-semibold text-xl transition-all duration-300 lg:transition-none fixed top-16 -left-[100%] pt-10">
          <li className={styles.navlink}>
            <Link href="/shoes" onClick={handleOnClickLink}>
              Shoes
            </Link>
          </li>
          <li className={styles.navlink}>
            <Link href="/tshirts" onClick={handleOnClickLink}>
              Tshirts
            </Link>
          </li>
          <li className={styles.navlink}>
            <Link href="/hoodies" onClick={handleOnClickLink}>
              Hoodies
            </Link>
          </li>
          <li className={styles.navlink}>
            <button type="button" onClick={handleSidebar}>
              View Cart
            </button>
            <div className="sidebar1 w-[100vw]  h-[100vh] fixed -right-[150%] top-0  transition-all duration-300 z-[50] flex flex-row lg:hidden">
              <div className="w-[25%] bg-black/80 opacity-20 h-[100vh]"></div>
              <div className="w-[75%] bg-white flex flex-col">
                <button
                  type="button"
                  onClick={handleSidebar}
                  className="border-2 border-black h-12 w-12 grid place-content-center p-1 ml-auto rounded-xl bg-white"
                >
                  <IoCloseOutline />
                </button>
                1 2 3 4
              </div>
            </div>
          </li>
        </ul>
        <div className="hidden lg:block my-auto mr-24">
          <ul className="flex flex-row text-xl space-x-10 font-semibold">
            <li className={styles.navlink}>
              <Link href="/shoes">Shoes</Link>
            </li>
            <li className={styles.navlink}>
              <Link href="/tshirts">Tshirts</Link>
            </li>
            <li className={styles.navlink}>
              <Link href="/hoodies">Hoodies</Link>
            </li>
            <li className={styles.navlink}>
              <Link className={styles.navlink} href="#">
                <button type="button" onClick={handleSidebar}>
                  <FaShoppingCart />
                </button>
                <div className="sidebar2 w-[100vw] h-[100vh] fixed -right-[150%] top-0  transition-all duration-300 z-[50] flex flex-row">
                  <div className="w-[65%] bg-black/80 opacity-20 h-[100vh]"></div>
                  <div className="w-[35%] bg-white flex flex-col p-6">
                    <button
                      type="button"
                      onClick={handleSidebar}
                      className="border-2 border-black h-12 w-12 grid place-content-center p-1 ml-auto rounded-xl bg-white"
                    >
                      <IoCloseOutline />
                    </button>
                    <div>
                      <h1 className="font-bold text-xl"> Shopping Cart</h1>
                      <ol className="list-decimal space-y-5 mt-5 ml-4">
                        <li>
                        <div className="flex flex-row">
                          <h3 className="mr-4">The Catalyzer [Tshirt] </h3>
                          <h3 className="flex justify-center my-auto">
                            {" "}
                            <span className="my-auto">
                              <CiCircleMinus />
                            </span>
                            2{" "}
                            <span className="my-auto">
                              {" "}
                              <CiCirclePlus />
                            </span>
                          </h3>
                          </div>
                        </li>
                        <li>
                        <div className="flex flex-row">
                          <h3 className="mr-4">1. The Catalyzer [Tshirt] </h3>
                          <h3 className="flex justify-center my-auto">
                            {" "}
                            <span className="my-auto">
                              <CiCircleMinus />
                            </span>
                            3{" "}
                            <span className="my-auto">
                              {" "}
                              <CiCirclePlus />
                            </span>
                          </h3>
                          </div>
                        </li>
                        <li>
                          <div className="flex flex-row">

                          <h3 className="mr-4">1. The Catalyzer [Tshirt] </h3>
                          <h3 className="flex justify-center my-auto">
                            {" "}
                            <span className="my-auto">
                              <CiCircleMinus />
                            </span>
                            2{" "}
                            <span className="my-auto">
                              {" "}
                              <CiCirclePlus />
                            </span>
                          </h3>
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
