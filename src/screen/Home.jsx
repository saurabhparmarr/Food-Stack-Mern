import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import axios from "axios";

const images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setNextIndex((index + 1) % images.length);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      <div className="relative w-full h-[400px] md.h-[600px] overflow-hidden">
        <img
          src={images[index]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isTransitioning ? "opacity-0" : "opacity-100"}`}
          alt=""
        />
        <img
          src={images[nextIndex]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isTransitioning ? "opacity-100" : "opacity-0"}`}
          alt=""
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 max-w-md">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex bg-white rounded-md shadow-lg overflow-hidden"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product..."
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="p-4 grid grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          products
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((item) => <Card key={item._id} product={item} />)
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
