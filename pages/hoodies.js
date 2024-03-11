import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/Models/Product";
const Hoodies = (props) => {
  const {products} = props;

  return (
    <>
      <div className="text-gray-600 body-font px-4">
        <div className="py-2">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 md:px-10 lg:px-24">
            {products ? (
              Object.keys(products).map((item) => {
                return (
                  <Link
                    key={products[item]._id}
                    href={`/product/${products[item].slug}`}
                    className="h-[50vh] w-[65vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] lg:h-[55vh] shadow-xl m-2 md:m-4 mx-auto"
                  >
                    <div className="block relative h-[60%] rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-bottom w-full h-full block"
                        src={`${products[item].img}`}
                      />
                    </div>
                    <div className="p-4">
                      <h3>{products[item].category}</h3>
                      <h2 className="text-gray-900 title-font text-xl md:text-2xl font-semibold">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                      <div className="mt-1">
                        <span>Sizes: </span>
                        {products[item].size.includes("S") && <span className="border px-1 mx-1 w-4 border-black">S</span>}
                        {products[item].size.includes("M") && <span className="border px-1 mx-1 w-4 border-black">M</span>}
                        {products[item].size.includes("L") && <span className="border px-1 mx-1 w-4 border-black">L</span>}
                        {products[item].size.includes("XL") && <span className="border px-1 mx-1 w-4 border-black">XL</span>}
                      </div>
                      <div className="mt-1 flex flex-row">
                        <span>Colors: </span>
                        {products[item].color.includes("green") && <div className="bg-lime-500 h-4 w-4 mx-1 rounded-xl my-auto"></div>}
                        {products[item].color.includes("yellow") && <div className="bg-yellow-400 h-4 w-4 mx-1 rounded-xl my-auto"></div>}
                        {products[item].color.includes("black") && <div className="bg-black h-4 w-4 mx-1 rounded-xl my-auto"></div>}
                        {products[item].color.includes("white") && <div className="bg-white border border-black h-4 w-4 mx-2 rounded-xl my-auto"></div>}
                        {products[item].color.includes("red") && <div className="bg-red-500 h-4 w-4 mx-1 rounded-xl my-auto"></div>}
                        {products[item].color.includes("pink") && <div className="bg-pink-500 h-4 w-4 mx-1 rounded-xl my-auto"></div>}
                        {products[item].color.includes("blue") && <div className="bg-blue-500 h-4 w-4 mx-1 rounded-xl my-auto"></div>}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="w-[100%] h-[70vh] mt-12 mx-auto">
                <h1 className="text-3xl font-semibold text-center">
                  No items available
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "Hoodies" });
  let hoodies = {};
  for (let item of products) {
    if (item.title in hoodies) {
      if (
        !hoodies[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].color.push(item.color);
      }
      if (
        !hoodies[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        hoodies[item.title].size.push(item.size);
      }
    } else {
      hoodies[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        hoodies[item.title].color = [item.color];
        hoodies[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products:JSON.parse(JSON.stringify(hoodies))}, // will be passed to the page component as props
  };
}
export default Hoodies;
