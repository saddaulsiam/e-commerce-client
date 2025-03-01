import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { removeOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { useOrderNowMutation } from "@/redux/features/order/orders/ordersApi";
import { useCreateStipePaymentIntentMutation } from "@/redux/features/order/payment/paymentApi";
import { useAppSelector } from "@/redux/hooks";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  MainOrder,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../OrderProduct/OrderInterface";

interface TProps {
  setOpenStripe: Dispatch<SetStateAction<boolean>>;
}

/**
 * CheckOutForm
 * Handles Stripe payment flow:
 * 1. Creates a PaymentIntent on the backend.
 * 2. Renders a Stripe CardElement for card details.
 * 3. Confirms the payment and creates an order upon success.
 */
const StripeCheckOutForm = ({ setOpenStripe }: TProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const router = useRouter();

  // Local state for error messages, client secret, and processing status
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);

  // Retrieve user, shipping address, and cart info from Redux
  const { user } = useAppSelector(({ state }) => state.auth);
  const { shippingAddress } = useAppSelector(({ state }) => state.orderDetails);
  const cart = useAppSelector(({ state }) => state.cart);

  const [orderNow] = useOrderNowMutation();
  const [createStipePaymentIntent] = useCreateStipePaymentIntentMutation();

  // Create PaymentIntent on the backend.
  useEffect(() => {
    if (!cart?.totalAmount) return;

    (async () => {
      try {
        const res = await createStipePaymentIntent({
          totalAmount: cart.totalAmount,
        }).unwrap();

        if (res?.success && res?.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          throw new Error("Failed to generate client secret.");
        }
      } catch (error: any) {
        setErrorMessage(
          error.message || "Error creating payment intent. Please try again.",
        );
      }
    })();
  }, [cart.totalAmount, createStipePaymentIntent]);

  // Handle form submission to process payment
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate that Stripe.js and the client secret have loaded
    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe.js has not loaded properly.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setErrorMessage("Card element not found.");
      return;
    }

    setProcessing(true);
    setErrorMessage("");

    try {
      // Create a payment method with the provided card details
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      });

      if (paymentMethodError) {
        throw new Error(
          paymentMethodError.message || "Payment method creation failed.",
        );
      }

      // Confirm the payment using the client secret from the backend
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        });

      if (confirmError) {
        throw new Error(confirmError.message || "Payment confirmation failed.");
      }

      // Payment was successful
      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment completed successfully!");

        // Prepare order data for order creation
        const orderData: MainOrder = {
          userId: user?._id as string,
          totalAmount: cart.totalAmount,
          paymentMethod: PaymentMethod.STRIPE,
          isPaid: true,
          paymentStatus: PaymentStatus.PAID,
          shippingAddress: shippingAddress,
          status: OrderStatus.PROCESSING,
          subOrders: cart.cartItems,
        };

        // Create the order in the backend
        const res = await orderNow(orderData).unwrap();

        if (res.success) {
          // Clear the cart and order details in Redux, then redirect
          toast.success(res?.message || "Order placed successfully!");
          dispatch(clearCart());
          dispatch(removeOrderDetails());
          router.push("/payment/success");
          setOpenStripe(false);
        } else {
          throw new Error("Order processing failed. Contact support.");
        }
      }
    } catch (error: any) {
      setErrorMessage(
        error?.message || "Something went wrong with the payment process.",
      );
      toast.error(error?.message || "Payment failed. Try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Stripe CardElement for securely capturing card details */}
      <CardElement className="rounded-md border p-2" />

      {/* Display any error messages */}
      {errorMessage && (
        <p className="mt-3 text-center text-red-500">{errorMessage}</p>
      )}

      <Button className="mt-10" disabled={processing}>
        {processing ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
};

export default StripeCheckOutForm;
