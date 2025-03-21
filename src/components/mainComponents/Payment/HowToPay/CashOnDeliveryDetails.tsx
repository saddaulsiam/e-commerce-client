import React from "react";
import { FcOk } from "react-icons/fc";

const CashOnDeliveryDetails = () => {
  return (
    <ul className="space-y-3 text-base font-light text-gray-600">
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-gray-800">
          Select &quot;Cash on Delivery&quot;
        </span>{" "}
        as your payment method at checkout.
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Confirm your{" "}
        <span className="font-semibold text-gray-800">
          shipping address
        </span>{" "}
        and order details before proceeding.
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Your order will be{" "}
        <span className="font-semibold text-gray-800">processed </span>
        and shipped to your address.
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Upon delivery, please have the{" "}
        <span className="font-semibold text-gray-800">cash amount </span>
        ready to hand over to the delivery agent.
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        If you have any questions, contact our{" "}
        <span className="font-semibold text-gray-800">support team</span>.
      </li>
    </ul>
  );
};

export default CashOnDeliveryDetails;
