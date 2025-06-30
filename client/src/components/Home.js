import React from "react";
import "./Home.css";
import Product from "./Product";
import philipsImg from "../assets/philips.jpg";
import serum from "../assets/estee.jpg";
import guitar from "../assets/images.jpeg";
import pic from "../assets/ear.jpg";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/71nwqPZaNRL._SX3000_.jpg"
          alt="Amazon Banner"
        />

        {/* Row 1 */}
        <div className="home__row">
          <Product
            id="1"
            title="The Lean Startup by Eric Ries"
            price={499}
            image="https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UY327_FMwebp_QL65_.jpg"
            rating={5}
          />
          <Product
            id="2"
            title="Realme Buds Wireless 3"
            price={1699}
            image={pic}
            rating={4}
          />
        </div>

        {/* Row 2 */}
        <div className="home__row">
         <Product
            id="3"
            title="PHILIPS BHS738/00 Kerashine Titanium Wideplate Straightner"
            price={3076}
            rating={4}
            image={philipsImg}
         />


          <Product
            id="4"
            title="Estee Lauder Advanced Night Repair Serum"
            price={5380}
            rating={5}
            image={serum}
         />

         <Product
            id="5"
            title="Ibanez GRX40 Electric Guitar"
            price={27990}
            rating={4}
            image={guitar}
         />

        </div>
      </div>
    </div>
  );
}

export default Home;
