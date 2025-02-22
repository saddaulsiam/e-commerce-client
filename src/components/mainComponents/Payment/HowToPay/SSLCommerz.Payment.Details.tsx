import React from "react";
import { FcOk } from "react-icons/fc";

const SSLCommerzPaymentDetails = () => {
  return (
    <ul className="space-y-3 text-base font-light text-my-gray-200">
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-my-gray-100">
          Proceed To Payment{" "}
        </span>
        বাটনে ক্লিক করো
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-my-gray-100">SSL Commerz </span>
        এর একটি <span className="font-semibold text-my-gray-100">Pop Up </span>
        প্যানেল আসবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        সেখান থেকে
        <span className="font-semibold text-my-gray-100">
          {" "}
          Cards, Mobile Banking Net Banking{" "}
        </span>
        যে কোন একটি অপশন সিলেক্ট করো।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Cards:{" "}
        <span className="font-semibold text-my-gray-100">
          Visa, Debit, Credit & Prepaid cards
        </span>
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Mobile banking:{" "}
        <span className="font-semibold text-my-gray-100">
          Bkash, Roket, Nagad, Mycash, Mcash, SureCash
        </span>
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        Net Banking:{" "}
        <span className="font-semibold text-my-gray-100">
          City Bank, Bank Asia, MTB, Islami bank, Brac bank
        </span>
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        পরবর্তী অপশন অনুসরণ করে পেমেন্ট কমপ্লিট করে ফেলো।
      </li>
    </ul>
  );
};

export default SSLCommerzPaymentDetails;
