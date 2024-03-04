import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState();

  useEffect(() => {
    try {
      // console.log(myCart);
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (currentCart) => {
    localStorage.setItem("cart", JSON.stringify(currentCart));
    let total = 0;
    let keys = Object.keys(currentCart);
    for (let i = 0; i < keys.length; i++) {
      total += currentCart[keys[i]].price * currentCart[keys[i]].qty;
    }
    setSubTotal(total);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
    
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    // let newCart = JSON.parse(JSON.stringify(cart));
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    } else {
    }

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = (e) => {
    e.preventDefault();
    setCart({});
    saveCart({});
  };

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      ;
      <Footer />
    </>
  );
}
