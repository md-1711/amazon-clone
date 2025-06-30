import React from "react";
import "./Checkout.css";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "../components/CheckoutProduct";
import Subtotal from "../components/Subtotal";


const Checkout = () => {
  const [{ basket }] = useStateValue();

  

return (
  <div className="checkout">
    <div className="checkout__left">
      <img
        className="checkout__ad"
        src="https://m.media-amazon.com/images/G/31/IMG20/Home/2023/JanART/PC_Header.jpg"
        alt="Checkout Ad"
      />

      <div>
        <h2 className="checkout__title">Your Shopping Basket</h2>

        {basket?.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          basket.map((item, index) => (
            <CheckoutProduct
              key={index}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))
        )}
      </div>
    </div>

    <div className="checkout__right">
      <Subtotal />
    </div>
  </div>
  );
};

export default Checkout;
