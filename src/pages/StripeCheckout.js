import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // the card form
import { selectCurrentOrder } from "../features/order/orderSlice";
import "../Stripe.css"

const stripePromise = loadStripe(
  "pk_test_51RmZPoPHolbJLNNbGOmUozglN0ghO6MpzTL1yYmKhUJz9ITthaMbtnAm1jAONYTUXIKlJ4kmVVVm9RUk9F1B85zv00c5bXOJwB"
); // your publishable key

const StripeCheckout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  // Redux Toolkit
  console.log("currentOrder:", currentOrder);

  //   useEffect(() => {
  //     if (currentOrder) {
  //       console.log("currentOrder:", currentOrder);

  //       fetch("/create-payment-intent", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ totalAmount: currentOrder?.totalAmount }),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => setClientSecret(data.clientSecret));
  //     } else if (!currentOrder || !currentOrder.totalAmount) {
  //       return;
  //     }
  //   }, [currentOrder]);

 useEffect(() => {
  if (currentOrder) {
    console.log("Fetching payment intent...");
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta:{
        order_id: currentOrder.id // this info will go to our stripe and then to webhook
        // so that we can conclude the payment was successful if the payment was successful
      }
    })
      .then((res) => {
        console.log("Response:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }
}, [currentOrder]);

  const appearance = { theme: "stripe" };

  if (!currentOrder || !currentOrder.totalAmount) {
    return <div>Loading order details...</div>; // or <Navigate to="/checkout" />
  }
  if (!clientSecret) {
    return <div>Preparing payment session...</div>;
  }

  return (
    clientSecret && (
      <div className="Stripe">
        <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    )
  );
};

export default StripeCheckout;
