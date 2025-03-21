import React from "react";
import { FcOk } from "react-icons/fc";

const StripePaymentDetails = () => {
  return (
    <ul className="space-y-3 text-base font-light text-gray-600">
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-gray-800">
          Proceed to Payment
        </span>{" "}
        by clicking the Pay With stripe button.
      </li>
      <li>
        <FcOk className="mr-3 inline" />A{" "}
        <span className="font-semibold text-gray-800">
          Stripe
          <span className="font-semibold text-blue-500"> Pop Up </span>
        </span>{" "}
        page will open.
      </li>                                 
      <li>
        <FcOk className="mr-3 inline" />
        Choose your preferred payment method:
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Cards:{" "}
        <span className="font-semibold text-gray-800">
          Visa, Mastercard, American Express, Discover
        </span>
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Put your card details and click the{" "}
        <span className="font-semibold text-gray-800">Pay Button</span>
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        If you have any questions, contact our{" "}
        <span className="font-semibold text-gray-800">support team</span>.
      </li>
    </ul>
  );
};

export default StripePaymentDetails;
