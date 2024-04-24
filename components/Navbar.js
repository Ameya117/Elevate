import React, { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { LuLogOut } from "react-icons/lu";
import { Toaster, toast } from "sonner";
import {signOut} from 'firebase/auth';

const Navbar = (props) => {
  const router = useRouter();
  const { cart, removeFromCart, subTotal, clearCart, addToCart } = props;
  const [icon, setIcon] = useState("bars");
  const [dropdown, setDropdown] = useState();
  const [token, setToken] = useState();
  const [selected, setSelected] = useState(false);
  const handleIcon = () => {
    icon === "bars" ? setIcon("close") : setIcon("bars");
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  let element;
  if (icon === "bars") {
    element = <FaBars />;
  } else {
    element = <IoCloseOutline />;
  }
  const handleLogout = (e) => {
    /*
    try{

      await signOut(auth);
    }catch(e){
      console.error(e)
    }
    */
    e.preventDefault();
    localStorage.removeItem("token");
    setToken();
    toast.success("logged out");
    setTimeout(function () {
      router.push("/");
    }, 1000);
  };
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
    if (token) {
      const sidebar = document.querySelector(".sidebar");
      const sidebar_cover = document.querySelector(".sidebar-cover");
      !selected
        ? (setSelected(true),
          sidebar.classList.remove("-right-[150%]"),
          sidebar_cover.classList.remove("-left-[150%]"),
          sidebar.classList.add("right-0"),
          sidebar_cover.classList.add("left-0"))
        : (setSelected(false),
          sidebar.classList.add("-right-[150%]"),
          sidebar_cover.classList.add("-left-[150%]"),
          sidebar_cover.classList.remove("left-0"),
          sidebar.classList.remove("right-0"));
    } else {
      toast.info("Login to view cart");
    }
  };

  const handleOnClickCheckout = (e) => {
    e.preventDefault();
    const sidebar = document.querySelector(".sidebar");
    const sidebar_cover = document.querySelector(".sidebar-cover");
    !selected
      ? (setSelected(true),
        sidebar.classList.remove("-right-[150%]"),
        sidebar_cover.classList.remove("-left-[150%]"),
        sidebar_cover.classList.remove("left-0"),
        sidebar.classList.add("right-0"))
      : (setSelected(false),
        sidebar.classList.add("-right-[150%]"),
        sidebar_cover.classList.add("-left-[150%]"),
        sidebar_cover.classList.remove("left-0"),
        sidebar.classList.remove("right-0"));

    router.push("/checkout");
  };
  return (
    <>
      <div
        className={`${router.pathname === "/signup" ? "hidden" : "block"} ${
          router.pathname === "/login" ? "hidden" : "block"
        } ${
          router.pathname === "/forgot" ? "hidden" : "block"
        } sticky top-0 bg-white  z-[10]`}
      >
        <Toaster richColors position="top-right" duration={2000} />
        <nav
          className={`h-16 shadow-md lg:flex lg:flex-row lg:justify-between `}
        >
          <div className="float-right flex relative top-5 text-2xl lg:hidden">
            <Link
              href={"/login"}
              className={`${!token ? "block" : "hidden"} my-auto mx-2`}
            >
              <FaUserCircle />
            </Link>
            <span
              onClick={handleLogout}
              className={`${token ? "block" : "hidden"} my-auto mx-2`}
            >
              <LuLogOut />
            </span>
            <input
              type="checkbox"
              id="check"
              hidden
              onClick={handleNavbar}
              className="lg:hidden"
            />
            <label htmlFor="check" className="lg:hidden mx-4">
              <span onClick={handleIcon} className="text-xl">
                {" "}
                {element}
              </span>
            </label>
          </div>
          <Link
            href="/"
            className="font-bold text-2xl my-auto hover:cursor-pointer ml-4 relative top-4 lg:top-0"
          >
            Elevate
          </Link>
          {/* Phone navbar */}
          <ul className="block lg:hidden text-center space-y-5 bg-[#F0F8FF] h-[200vh] w-[100vw] lg:relative font-semibold text-xl transition-all duration-300 lg:transition-none fixed top-16 -left-[100%] pt-10">
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
              <Link href="/orders">Orders</Link>{" "}
            </li>
            <li className={styles.navlink}>
              <Link href="/myaccount">My Account</Link>{" "}
            </li>
            <li className={styles.navlink}>
              <button type="button" onClick={handleSidebar}>
                View Cart
              </button>
            </li>
          </ul>

          <div className="hidden lg:block my-auto ml-24">
            <ul className="flex flex-row lg:relative absolute text-xl space-x-10 font-semibold mx-4">
              <li className={styles.navlink}>
                <Link href="/shoes">Shoes</Link>
              </li>
              <li className={styles.navlink}>
                <Link href="/tshirts">Tshirts</Link>
              </li>
              <li className={styles.navlink}>
                <Link href="/hoodies">Hoodies</Link>
              </li>
            </ul>
          </div>
          <div className="hidden text-xl lg:flex">
            {token && (
              <span
                className="text-3xl my-auto h-fit cursor-pointer"
                // onClick={toggleDropdown}
              >
                <RiArrowDropDownLine
                  onMouseOver={() => {
                    setDropdown(true);
                  }}
                />
              </span>
            )}
            {token && dropdown && (
              <div
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="absolute top-16 bg-white shadow-lg border py-2 w-40 right-2 rounded-lg my-1"
              >
                <ul className="text-sm font-semibold text-center">
                  <li className="hover:bg-orange-200 cursor-pointer">
                    <span className="px-1">
                      <Link href="/myaccount">My account</Link>
                    </span>
                  </li>
                  <li className="hover:bg-orange-200 cursor-pointer my-1">
                    <span className="px-1">
                      <Link href="/orders">Orders</Link>
                    </span>
                  </li>
                  <li className="hover:bg-orange-200 cursor-pointer my-1">
                    <span className="px-1">
                      <button onClick={handleLogout} href="/orders">
                        Logout
                      </button>
                    </span>
                  </li>
                </ul>
              </div>
            )}
            <Link
              href={"/login"}
              className={`${!token ? "block" : "hidden"} my-auto mx-2`}
            >
              <FaUserCircle />
            </Link>

            <button
              type="button"
              onClick={handleSidebar}
              className="h-fit my-auto mx-3 hidden lg:block"
            >
              <FaShoppingCart />
            </button>
          </div>
          <div className="flex flex-row absolute">
            <div className="sidebar-cover fixed w-[20%] md:w-[70%] lg:w-[75%] -left-[150%] opacity-0 h-[120vh] bg-black/80 transition-all duration-300 overflow-y-scroll"></div>
            <div className="sidebar w-[80%] md:w-[30%] lg:w-[25%] bg-[#f7e8e5] flex flex-col p-6 fixed -right-[150%] top-0  transition-all duration-300 z-[50] h-[100vh] border-l-2  border-black rounded-l-lg">
              <button
                type="button"
                onClick={handleSidebar}
                className="border text-xl border-black h-6 w-6 grid place-content-center rounded-lg bg-white ml-auto"
              >
                <IoCloseOutline />
              </button>
              <div>
                <h1 className="font-bold text-xl mb-3">Shopping Cart</h1>
                {/* <div className="w-[65%] h-1 bg-black rounded-xl m-auto"></div> */}
                {Object.keys(cart).length > 0 ? (
                  <div>
                    <ol className="list-decimal space-y-5 mt-5 ml-4">
                      {Object.keys(cart).map((item) => {
                        return (
                          <li key={item}>
                            <div className="flex flex-row">
                              <h3 className="mr-4 text-lg">
                                {cart[item].name}{" "}
                                <span className="font-light">
                                  [{cart[item].size.size}/
                                  {cart[item].variant.color}]
                                </span>
                              </h3>
                              <h3 className="flex justify-center my-auto text-lg md:text-xl">
                                <span
                                  className="my-auto"
                                  onClick={() => {
                                    removeFromCart(
                                      item,
                                      1,
                                      cart[item].price,
                                      cart[item].name,
                                      cart[item].size,
                                      cart[item].variant
                                    );
                                  }}
                                >
                                  <CiCircleMinus />
                                </span>

                                {cart[item].qty}
                                <span
                                  className="my-auto"
                                  onClick={() => {
                                    addToCart(
                                      item,
                                      1,
                                      cart[item].price,
                                      cart[item].name,
                                      cart[item].size,
                                      cart[item].variant
                                    );
                                  }}
                                >
                                  <CiCirclePlus />
                                </span>
                              </h3>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                    <div className="my-4 mt-10">
                      {subTotal && (
                        <span className="text-lg font-normal italic mx-auto">
                          Subtotal: ₹{subTotal}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <h2 className="text-center mt-10 font-normal">
                    Cart is Empty. Add a few items to checkout
                  </h2>
                )}
              </div>
              <div
                className={`${
                  Object.keys(cart).length == 0 ? "hidden" : "block"
                } flex flex-col justify-center w-[60%] mx-auto`}
              >
                <button
                  onClick={clearCart}
                  type="button"
                  className="py-2 border-2 border-black transition-none lg:transition-all duration-300 px-4 mx-2 my-4 hover:bg-black hover:text-white"
                >
                  Clear Cart
                </button>
                <span
                  className="py-2 border-2 border-black transition-none lg:transition-all duration-300 px-4 mx-2 my-4 hover:bg-black hover:text-white text-center cursor-pointer"
                  onClick={handleOnClickCheckout}
                >
                  Checkout
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
