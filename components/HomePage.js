import React from "react";
import Link from "next/link";
import { motion, useTransform, useScroll } from "framer-motion";

const HomePage = () => {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.12 * custom,
      },
    }),
  };

  const data = [
    {
      title: "Sneaker 2",
      category: "SNEAKERS",
      imgsrc: "/sneaker2.webp",
      custom: 1,
      slug: "sneaker2",
      price: 899,
    },
    {
      title: "Tshirt 1",
      category: "TSHIRTS",
      imgsrc: "/tshirt1.webp",
      custom: 1.5,
      slug: "tshirt1",
      price: 499,
    },
    {
      title: "Hoodie 1",
      category: "HOODIES",
      imgsrc: "/hoodies1.webp",
      custom: 2,
      slug: "hoodie1",
      price: 899,
    },
    {
      title: "Sneaker 1",
      category: "SNEAKERS",
      imgsrc: "/sneaker1.jpg",
      custom: 2.5,
      slug: "sneaker1",
      price: 899,
    },
    {
      title: "Tshirt 2",
      category: "TSHIRTS",
      imgsrc: "/tshirt2.webp",
      custom: 3,
      slug: "tshirt2",
      price: 499,
    },
    {
      title: "Hoodie 2",
      category: "HOODIES",
      imgsrc: "/hoodies2.webp",
      custom: 2,
      slug: "hoodie2",
      price: 499,
    },
  ];

  return (
    <div>
      <section className="body-font">
        {/* style={{backgroundImage: "url(/background.jpg)"}} */}
        <div className="mx-auto flex flex-col lg:flex-row shadow-sm lg:shadow-xl lg:bg-orange-50">
          <div className="m-auto grid gap-2 md:gap-6 lg:gap-10 mt-5 lg:m-auto">
            <h1 className="text-xl lg:text-5xl m-auto w-fit">
              <span className="font-bold">Elevate</span> Your Style <br />{" "}
            </h1>
            <h1 className="text-xl lg:text-5xl m-auto w-fit lg:mb-10">
              <span className="font-bold">Elevate</span> Your Wardrobe{" "}
            </h1>
            <button className=" bg-orange-400 w-fit mx-auto py-1 px-2 lg:px-4 my-3 hover:bg-orange-500">
              <span className="text-sm lg:text-xl">Shop Now</span>
            </button>
          </div>

          <img
            src="/home_img.jpg"
            className="object-cover h-[20vh] sm:h-[35vh] md:h-[50vh] lg:h-[65vh] lg:w-[45vw] mx-auto right-0"
            alt="l"
          />
        </div>

        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-medium title-font mb-2 text-gray-900">
              View Our Products
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              magni enim hic.
            </p>
          </div>

          <section className="text-gray-600 body-font">
            <div className="px-3 py-2 mx-auto">
              <div className="flex flex-wrap justify-between">
                {data &&
                  data.map((item) => {
                    return (
                      <motion.div
                        className="lg:w-[20vw] md:w-[35vw] w-full shadow-xl m-2 md:m-0"
                        variants={fadeInAnimationVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{
                          once: true,
                        }}
                        custom={item.custom}
                      >
                        <Link
                          href={`/product/${item.slug}`}
                          className="lg:w-1/4 md:w-1/2 w-full shadow-xl m-2 md:m-4"
                        >
                          <div className="block relative h-48 rounded overflow-hidden">
                            <img
                              alt="ecommerce"
                              className="object-cover object-center w-full h-full block"
                              src={`${item.imgsrc}`}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                              {item.category}
                            </h3>
                            <h2 className="text-gray-900 title-font text-lg font-medium">
                              {item.title}
                            </h2>
                            <p className="mt-1">₹{item.price}</p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
