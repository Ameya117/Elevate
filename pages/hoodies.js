import React from "react";
import Link from "next/link";

const Hoodies = () => {
  const data = [
    {
      id: 1001,
      imgsrc: "/hoodies1.webp",
      category: "Hoodies",
      price: "1999",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 1002,
      imgsrc: "/hoodies2.webp",
      category: "Hoodies",
      price: "999",
      name: "Shooting Stars",
      url: "/product/code",
    },
    {
      id: 1003,
      imgsrc: "/hoodies1.webp",
      category: "Hoodies",
      price: "1999",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 1004,
      imgsrc: "/hoodies2.webp",
      category: "Hoodies",
      price: "1999",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 1005,
      imgsrc: "/hoodies1.webp",
      category: "Hoodies",
      price: "1999",
      name: "The 400 Blows",
      url: "/product/code",
    },
    {
      id: 1006,
      imgsrc: "/hoodies2.webp",
      category: "Hoodies",
      price: "2199",
      name: "Shooting Stars",
      url: "/product/code",
    },
    {
      id: 1007,
      imgsrc: "/hoodies1.webp",
      category: "Hoodies",
      price: "2299",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 1008,
      imgsrc: "/hoodies2.webp",
      category: "Hoodies",
      price: "899",
      name: "The Catalyzer",
      url: "/product/code",
    },
  ];
  return (
    <>
        <div className="text-gray-600 body-font px-4">
          <div className=" py-2 mx-auto">
            <div className="grid md:grid-cols-2 gap-y-12 lg:gap-10 lg:grid-cols-3">
              {data ? (
                data.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      href={`${item.url}`}
                      className="h-[45vh] w-[65vw] md:w-[40vw] lg:w-[30vw] shadow-xl m-2 md:m-4 mx-auto"
                    >
                      <div className="block relative h-[60%] rounded-t overflow-hidden">
                        <img
                          alt="ecommerce"
                          className="object-cover object-bottom w-full h-full block"
                          src={`${item.imgsrc}`}
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-gray-900 title-font text-xl font-medium">
                          {item.name}
                        </h2>
                        <p className="mt-1">₹{item.price}</p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="w-[100vw] h-[70vh]">
                  <h1 className="text-3xl font-semibold grid place-content-center mt-12">
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

export default Hoodies;
