import React from "react";
import Link from "next/link";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
const Checkout = ({ cart, clearCart, addToCart, removeFromCart,subTotal }) => {
  return (
    <div className="container my-4 p-10">
      <h1 className="text-xl md:text-2xl lg:text3xl font-bold text-center mb-4">
        Checkout
      </h1>
      <h2 className="text-lg md:text-xl font-semibold my-4">
        1. Delivery Details
      </h2>
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row w-[100%]">
            
        <label htmlFor="name" className="text-lg ml-0 lg:mr-4 my-auto">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 lg:w-[40%]"
          placeholder="Enter your name"
          />
        <label htmlFor="email" className="text-lg ml-0 lg:mx-4 my-auto">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 lg:w-[40%]"
          placeholder="Enter your name"
          />
          </div>
         <label htmlFor="phone" className="text-lg ">
          Phone
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 w-[70%]md:w-[50%] lg:w-[40%]"
          placeholder="Enter your name"
        />
        <label htmlFor="address" className="text-lg">
          Address
        </label>
        <textarea
          type="text"
          id="address"
          name="address"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 "
          placeholder="Enter your name"
          rows={5}
        />
        <div className="flex flex-col lg:flex-row w-[100%] my-2">

        <label htmlFor="city" className="text-lg ml-0 lg:mr-4 my-auto">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 w-[70%]md:w-[50%] lg:w-[40%]"
          placeholder="Enter your name"
        />
       
        
        <label htmlFor="pincode" className="text-lg ml-0 lg:mx-4 my-auto">
          Pincode
        </label>
        <input
          type="text"
          id="pincode"
          name="pincode"
          className="border border-black px-2 py-1 my-1 focus:border focus:border-orange-500 focus:ring-2 active:ring-blue-200 w-[70%]md:w-[50%] lg:w-[40%]"
          placeholder="Enter your name"
          />
      </div>
          </div>

      <h1 className="text-lg md:text-xl font-semibold my-4">2. Review Cart</h1>
      <div className="sidebar flex flex-row rounded-xl border border-black overflow-hidden my-4 p-4">
        {/* <h2>Items</h2> */}
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
                        <h3 className="mr-4 text-xl">{cart[item].name} [{cart[item].size.size}/{cart[item].variant.color}] </h3>
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
              {subTotal && <div className="text-lg lg:text-xl font-semibold mt-4">Subtotal: ₹{subTotal}</div>}
              
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
                type="button"
                className="my-auto p-1 lg:py-2 border-2 border-black transition-none lg:transition-all duration-300 lg:px-4 mx-2 hover:bg-black hover:text-white"
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
