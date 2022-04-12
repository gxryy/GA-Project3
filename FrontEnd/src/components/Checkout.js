import React from "react";
import "@stripe/stripe-js";

// make request to server, send id and quantity to server
const handleClick = () => {
  fetch("http://localhost:5001/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 },
      ],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
      console.log(url);
    })
    .catch((e) => {
      console.log(e.error);
    });
};

const Checkout = () => {
  return (
    <div>
      <h1>Stripe Checkout</h1>

      <button onClick={handleClick} type="submit">
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
