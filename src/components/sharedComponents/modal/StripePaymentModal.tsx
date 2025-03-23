import StripeCheckOutForm from "@/components/mainComponents/Payment/StripeCheckOutForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Dispatch, SetStateAction } from "react";

// Load your Stripe publishable key (use environment variables in production)
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface TProps {
  openStripe: boolean;
  setOpenStripe: Dispatch<SetStateAction<boolean>>;
}

/**
 * StripePaymentModal
 * Displays a modal with a secure payment form using Stripe Elements.
 */
const StripePaymentModal = ({ openStripe, setOpenStripe }: TProps) => {
  return (
    <Dialog open={openStripe} onOpenChange={setOpenStripe}>
      <DialogContent className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        {/* For accessibility: a hidden title for screen readers */}
        <DialogTitle>
          <VisuallyHidden>Stripe Payment Modal</VisuallyHidden>
        </DialogTitle>
        <div className="pb-8 text-center">
          <p className="text-lg font-medium text-primary">Secure Payment</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-600">
            Pay with Stripe
          </h3>
        </div>
        {/* Wrap your checkout form inside Stripe's Elements provider */}
        <Elements stripe={stripePromise}>
          <StripeCheckOutForm setOpenStripe={setOpenStripe} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default StripePaymentModal;
