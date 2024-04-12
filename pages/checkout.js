import React, { useEffect, useState } from "react";
import Link from "next/link";

import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const router = useRouter("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [city, setCity] = useState(true);
  const [state, setState] = useState(true);

  const handleOnChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    }

    setTimeout(() => {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 8 &&
        address.length > 5 &&
        pincode.length >= 5
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const initiatePayment = async () => {
    let oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name: name,
      address,
      pincode,
      phone,
    };
    // try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();
    let txnToken = res.txnToken;
    console.log(txnToken);
    // } catch (error) {
    // console.error("Error:", error);
    // }

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN", //transaction token
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="container my-4 p-10">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PATYM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        // onload="onScriptLoad();"
        crossorigin="anonymous"
      ></Script>
      <h1 className="text-xl md:text-2xl lg:text3xl font-bold text-center mb-4">
        Checkout
      </h1>
      <h2 className="text-base md:text-xl font-semibold my-4">
        1. Delivery Details
      </h2>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row w-[100%]">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-base ml-0 lg:mr-4 my-auto">
              Name
            </label>
            <input
              onChange={handleOnChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="border border-black px-2 py-1 my-1 mr-2 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 lg:w-[40vw]"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-base ml-0 lg:mx-4 my-auto">
              Email
            </label>
            <input
              onChange={handleOnChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="border border-black px-2 py-1 my-1 mx-0 lg:mx-2 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 lg:w-[40vw]"
              placeholder="Enter your name"
            />
          </div>
        </div>
        <label htmlFor="phone" className="text-base mt-2">
          Phone
        </label>
        <input
          onChange={handleOnChange}
          value={phone}
          type="text"
          id="phone"
          name="phone"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 w-[70%]md:w-[50%] lg:w-[40%]"
          placeholder="Phone no."
          maxLength={10}
          minLength={10}
        />
        <label htmlFor="address" className="text-base mt-2">
          Address
        </label>
        <textarea
          onChange={handleOnChange}
          value={address}
          type="text"
          id="address"
          name="address"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 "
          placeholder="Enter your address"
          rows={5}
        />
        <div className="flex flex-col lg:flex-row w-[100%] my-2">
          <div className="flex flex-col">
            <label
              htmlFor="pincode"
              className="text-base ml-0 lg:mr-4 my-auto "
            >
              Pincode
            </label>
            <input
              onChange={handleOnChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200  lg:w-[40vw]"
              placeholder="Enter your area pincode"
              maxLength={6}
              minLength={6}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-base ml-0 lg:mx-4 my-auto">
              City
            </label>
            <input
              onChange={handleOnChange}
              type="text"
              id="city"
              name="city"
              className="border border-black px-2 py-1 my-1 mx-0 lg:mx-2 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 lg:w-[40vw]"
              placeholder="City name"
              readOnly
            />
          </div>
        </div>
      </div>

      <h1 className="text-base md:text-xl font-semibold my-4">
        2. Review Cart
      </h1>
      <div className="sidebar flex flex-row rounded-xl border border-black overflow-hidden my-4 p-4">
        <div className="w-[100%] bg-white flex flex-col">
          <div>
            {Object.keys(cart).length > 0 ? (
              <div>
                <ol className="list-decimal space-y-5 ml-4">
                  {Object.keys(cart).map((item) => {
                    //item is the itemCode
                    return (
                      <li key={item}>
                        <div className="flex flex-row">
                          <h3 className="mr-4 text-xl">
                            {cart[item].name} [{cart[item].size.size}/
                            {cart[item].variant.color}]{" "}
                          </h3>
                          <h3 className="flex justify-center my-auto text-base md:text-xl">
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
                            <span className="mx-1">{cart[item].qty}</span>
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
                {subTotal && (
                  <div className="text-base lg:text-xl font-semibold mt-4">
                    Subtotal: ₹{subTotal}
                  </div>
                )}
              </div>
            ) : (
              <h2 className="text-center font-normal">
                Cart is Empty. Add a few items to checkout
              </h2>
            )}
          </div>
          <div
            className={`${
              Object.keys(cart).length == 0 ? "hidden" : "block"
            } flex flex-row justify-center`}
          >
            <div className="my-2">
              <button
                onClick={initiatePayment}
                type="button"
                className="my-auto p-1 rounded-md bg-orange-600 hover:bg-orange-500  transition-none lg:transition-all duration-300 lg:px-4 mx-2  cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={disabled}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
