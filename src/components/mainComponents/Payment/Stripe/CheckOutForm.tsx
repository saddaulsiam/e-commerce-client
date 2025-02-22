import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useOrderNowMutation } from "../../../../redux/features/orders/orders/ordersApi";
import { clearCart } from "../../../../redux/features/cart/cartSlice";
import { removeOrderDetails } from "../../../../redux/features/orders/orderDetails/orderDetailsSlice";

const CheckOutForm = ({ setIsOpen }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Redux
  const { user } = useSelector((state) => state.auth);
  const { details } = useSelector((state) => state.orderDetails);
  const { products } = useSelector((state) => state.cart);

  const [orderNow, { data, error, isSuccess }] = useOrderNowMutation();

  // Order total price
  let totalPrice = 0;

  products?.map((product) => {
    totalPrice += product.salePrice * product.quantity;
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/api/v1/payment/create-stripe-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.name || "unknown",
          email: user.email || "anonymous",
        },
      },
    });
    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment completed successfully");
      setIsOpen(false);

      // save payment information to the server
      const orderData = {
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
        },
        products: products,
        shippingAddress: details,
        paymentDetails: {
          transactionId: paymentIntent.id,
          paymentType: paymentMethod.card.brand + " " + paymentMethod.type,
          user: {
            id: user._id,
            email: user.email,
            displayName: user.displayName,
          },
        },
        orderStatus: "pending",
        paymentStatus: "paid",
        total: totalPrice,
      };

      orderNow(orderData).then((res) => {
        if (res.data?.status === "success") {
          dispatch(clearCart());
          dispatch(removeOrderDetails());
          router.push("/payment/success");
          toast.success(res.data?.message);
        }
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto  ">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#9ca3af",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="button mt-8 w-full cursor-pointer"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
        {errorMessage && <p className="mt-5 text-secondary">{errorMessage}</p>}
      </form>
    </>
  );
};

export default CheckOutForm;
