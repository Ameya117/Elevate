import React, { useState } from "react";
import { useRouter } from "next/router";
import Product from "@/Models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Slug = (props) => {
  const router = useRouter();
  const { addToCart, product, variants,buyNow } = props;
  const { slug } = router.query;

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkPincode = async () => {
    const pins = await fetch("http://localhost:3000/api/pincode");
    const pinsJson = await pins.json();
    if (pinsJson.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };

  const handleOnChangePin = (event) => {
    setPin(event.target.value);
  };

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);

  const refreshVariant = (newSize, newColor) => {
    let url = `http://localhost:3000/product/${variants[newColor][newSize]["slug"]}`;
    setSize(newSize);
    setColor(newColor);
    // window.location = url;
    router.push(url);
  };
  
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="h-auto md:h-[50vh] lg:w-1/2 w-full lg:h-auto object-cover object-bottom lg:object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Elevate
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} - [{product.size}/{product.color}]
              </h1>
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-orange-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-orange-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-orange-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-orange-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-orange-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div> */}
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {/* {Object.keys(variants).map((item) => {
                    return (
                      Object.keys(variants[item]).includes(size) &&  <button
                        key={item}
                        onClick={(e)=>refreshVariant(size,item)}
                        className={`border-2 ${color === item
                            ? "border-dotted border-black"
                            : "border-gray-300"} border-gray-300 ml-1 bg-${item}-500 bg-${item} rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    );
                  })} */}
                  {Object.keys(variants).includes("pink") &&
                    Object.keys(variants["pink"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "pink")}
                        className={`${
                          color === "pink"
                            ? "border-dotted border-black"
                            : "border-gray-300"
                        } border-2 ml-1 bg-pink-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "red")}
                        className={`${
                          color === "red"
                            ? "border-dotted border-black"
                            : "border-gray-300"
                        } border-2 ml-1 bg-red-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("yellow") &&
                    Object.keys(variants["yellow"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "yellow")}
                        className={`${
                          color === "yellow"
                            ? "border-dotted border-black"
                            : "border-gray-300"
                        } border-2 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "black")}
                        className={`${
                          color === "black"
                            ? "border-dotted border-white"
                            : "border-gray-300"
                        } border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("white") &&
                    Object.keys(variants["white"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "white")}
                        className={`${
                          color === "white"
                            ? "border-dotted border-black"
                            : "border-gray-300"
                        } border-2 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "green")}
                        className={`${
                          color === "green"
                            ? "border-dotted border-black"
                            : "border-gray-300"
                        } border-2 ml-1 bg-green-400 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={(e) => refreshVariant(size, "blue")}
                        className={`${
                          color === "blue"
                            ? "border-dotted border-black"
                            : "border-gray-300"
                        } border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}
                      ></button>
                    )}
                </div>

                <div className="flex ml-6 items-center ">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => refreshVariant(e.target.value, color)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-orange-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value="S">S</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value="M">M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value="L">L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value="XL">XL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  className="flex ml-4 text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                  onClick={() => {
                    addToCart(
                      slug,
                      1,
                      `${product.price}`,
                      `${product.title}`,
                      { size },
                      { color }
                    );
                    toast.success('Added to cart successfully!', {
                      position: "bottom-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "dark",
                      });
                  }}
                >
                  Add To Cart
                </button>
                <button
                  className="flex ml-4 text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded"
                  onClick={() => {
                    buyNow(
                      slug,
                      1,
                      product.price,
                      `${product.title}`,
                      { size },
                      { color }
                    );
                    router.push("/checkout");
                  }}
                >
                  Buy Now
                </button>
              </div>
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Check Pincode"
                  className="border border-slate-200 p-1"
                  onChange={handleOnChangePin}
                />
                <button
                  className="mx-2 px-2  border-b-2 border-black hover:border-2"
                  onClick={checkPincode}
                >
                  Check
                </button>
              </div>
              <div>
                {!service && service != null && (
                  <h3 className="text-red-700">
                    Sorry We do not deliver to this pincode
                  </h3>
                )}
                {service && service != null && (
                  <h3 className="text-green-700">
                    We deliver to this pincode!
                  </h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    }, // will be passed to the page component as props
  };
}

export default Slug;
