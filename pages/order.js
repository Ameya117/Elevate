import { useRouter } from "next/router";
import React from "react";
import Order from "@/Models/Order";
import mongoose from "mongoose";

const MyOrder = ({ subTotal,order }) => {


  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">ELEVATE</h2> */}
              <h1 className="text-gray-900 text-2xl title-font font-medium mb-4">
                ELEVATE
              </h1>
              <span className="text-sm text-slate-500">Your order has been placed successfully!</span>
              <div class="flex flex-row justify-between mb-4 w-[100%]">
                <a class="flex-grow border-b-2 py-2 text-lg px-1 text-center">
                  Item
                </a>
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-center">
                  Type
                </a>
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1 text-center">
                  Qty
                </a>
              </div>

              <p className="leading-relaxed mb-4">Order id: {order && order.orderId}</p>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Item 1</span>
                <span className="ml-auto text-gray-900">Blue</span>
                <span className="ml-auto text-gray-900">1</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Item 2</span>
                <span className="ml-auto text-gray-900">Medium</span>
                <span className="ml-auto text-gray-900">2</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Item 3</span>
                <span className="ml-auto text-gray-900">4</span>
                <span className="ml-auto text-gray-900">2</span>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-xl text-gray-900">
                  Total: ₹{subTotal}
                </span>
                <button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);


  return {
    props: {
      order:JSON.parse(JSON.stringify(order))
    }, // will be passed to the page component as props
  };
}

export default MyOrder;
