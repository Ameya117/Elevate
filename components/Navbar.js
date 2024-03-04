import React, { useState, useRef } from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

const Navbar = (props) => {
  const ref = useRef();
  const { cart, removeFromCart, subTotal, clearCart,addToCart } = props;
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
  const handleSidebar = (e) => {
    e.preventDefault();
    // const sidebar1 = document.querySelector(".sidebar1");
    const sidebar = document.querySelector(".sidebar");
    !selected
      ? (setSelected(true),
        sidebar.classList.remove("-right-[150%]"),
        sidebar.classList.add("right-0"))
      : (setSelected(false),
        sidebar.classList.add("-right-[150%]"),
        sidebar.classList.remove("right-0"));
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
              <button type="button" onClick={handleSidebar}>
                <FaShoppingCart />
              </button>
            </li>
          </ul>
        </div>
        <div className="sidebar w-[100vw] h-[100vh] fixed -right-[150%] top-0  transition-all duration-300 z-[50] flex flex-row">
          <div className="w-[20%] md:w-[65%] bg-black/80 opacity-20 h-[100vh]"></div>
          <div className="w-[80%] md:w-[35%] bg-white flex flex-col p-6">
            <button
              type="button"
              onClick={handleSidebar}
              className="border-2 border-black h-12 w-12 grid place-content-center p-1 ml-auto rounded-xl bg-white"
            >
              <IoCloseOutline />
            </button>
            <div>
              <h1 className="font-bold text-xl"> Shopping Cart</h1>
              {Object.keys(cart).length > 0 ? (
                <ol className="list-decimal space-y-5 mt-5 ml-4">
                  {Object.keys(cart).map((item) => {//item is the itemCode
                    return (
                      <li key={item}>
                        <div className="flex flex-row">
                          <h3 className="mr-4 text-xl">{cart[item].name} </h3>
                          <h3 className="flex justify-center my-auto text-lg md:text-xl">
                            <span className="my-auto" onClick={()=>{removeFromCart(item,1,cart[item].price,cart[item].name,cart[item].size,cart[item].variant)}}>
                              <CiCircleMinus />
                            </span>
                            {cart[item].qty}
                            <span className="my-auto bg-orange-50" onClick={()=>{addToCart(item,1,cart[item].price,cart[item].name,cart[item].size,cart[item].variant)}}>
                              <CiCirclePlus />
                            </span>
                            {/* {subTotal} */}
                          </h3>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <h2 className="text-center mt-10 font-normal">
                  Cart is Empty. Add a few items to checkout
                </h2>
              )}
            </div>
            <div
              className={`${
                Object.keys(cart).length == 0 ? "hidden" : "block"
              } flex flex-row justify-center`}
            >
              <button
                onClick={clearCart}
                type="button"
                className="py-2 border-2 border-black transition-none lg:transition-all duration-300 px-4 mx-2 my-4 hover:bg-black hover:text-white"
              >
                Clear Cart
              </button>
              <button
                type="button"
                className="py-2 border-2 border-black transition-none lg:transition-all duration-300 px-4 mx-2 my-4 hover:bg-black hover:text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
