import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../mainComponents/Payment/Stripe/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";

// stripe promise
const stripePromise = loadStripe(
  "pk_test_51NkLj1AkOdLWdOinJDXwCB46g94gCswPiDIPPKXrEatrIOD76cTVNDrOXXkfHsLnZcE2RevaXokXTl2tGTut6sf800rXH7FYT3"
);
const StripePaymentModal = ({ setIsOpen, isOpen }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center ">
                <Dialog.Panel
                  className="mx-2 w-full max-w-md transform overflow-hidden rounded-xl bg-white
                p-5 py-10 text-left align-middle shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-base font-medium text-primary">
                      Pay With
                    </p>
                    <h3 className="pb-10 text-3xl font-bold text-secondary">
                      Stripe
                    </h3>
                  </div>
                  <Elements stripe={stripePromise}>
                    <CheckOutForm setIsOpen={setIsOpen} />
                  </Elements>
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
export default StripePaymentModal;
