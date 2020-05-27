import React from "react";
import StripeCheckout from "react-stripe-checkout";

const stripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishKey = "pk_test_hJ4CRdOgGZkCsAcNwZO1bgY100Ouoj1v4S";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Crown Clothing Ltd."
      billingAddress
      shippingAddress
      image="http://svgshare.com/i/cuZ.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishKey}
    />
  );
};

export default stripeButton;
