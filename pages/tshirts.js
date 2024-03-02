import React from "react";
import Link from "next/link";

const Tshirts = () => {
  const data = [
    {
      id: 2001,
      imgsrc: "/tshirt1.webp",
      category: "Hoodies",
      price: "1999",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 2002,
      imgsrc: "/tshirt2.webp",
      category: "Hoodies",
      price: "999",
      name: "Shooting Stars",
      url: "/product/code",
    },
    {
      id: 2003,
      imgsrc: "/tshirt1.webp",
      category: "Hoodies",
      price: "1999",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 2004,
      imgsrc: "/tshirt2.webp",
      category: "Hoodies",
      price: "1999",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 2005,
      imgsrc: "/tshirt1.webp",
      category: "Hoodies",
      price: "1999",
      name: "The 400 Blows",
      url: "/product/code",
    },
    {
      id: 2006,
      imgsrc: "/tshirt2.webp",
      category: "Hoodies",
      price: "2199",
      name: "Shooting Stars",
      url: "/product/code",
    },
    {
      id: 2007,
      imgsrc: "/tshirt1.webp",
      category: "Hoodies",
      price: "2299",
      name: "The Catalyzer",
      url: "/product/code",
    },
    {
      id: 2008,
      imgsrc: "/tshirt2.webp",
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
          <div className="grid md:grid-cols-2 lg:gap-10 lg:grid-cols-3">
            {data ? (
              data.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={`${item.url}`}
                    className="h-[45vh] w-[65vw] md:w-[40vw] lg:w-[30vw] shadow-xl m-2 md:m-4 mx-auto"
                  >
                    <div className="block relative h-[65%] rounded overflow-hidden">
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

export default Tshirts;
