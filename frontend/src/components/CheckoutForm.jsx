import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import ApiService from "../api";
import "../App.css";

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const card = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    ApiService.pay({
      email,
      payment_method_id: paymentMethod.id,
    })
      .then((response) => {
        console.log(response.data);
        alert("Payment successful!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Payment unsuccessful!");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-card">
      <div className="form-row">
        <h2>Donate $5</h2>
      </div>
      <div className="form-row">
        <label>Email Address: </label>
        <input
          className="form-input"
          id="email"
          name="name"
          type="email"
          placeholder="email@example.com"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="form-row">
        <label>Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="card-errors" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="submit-btn">
        Submit Payment
      </button>
    </form>
  );
};
export default CheckoutForm;
