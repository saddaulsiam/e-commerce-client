import React from "react";
import { FcOk } from "react-icons/fc";

const RocketPaymentDetails = () => {
  return (
    <ul className="space-y-3 text-base font-light text-my-gray-200">
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-my-gray-100">Rocket Payment </span>
        সিলেক্ট করে কমপ্লিট পেমেন্ট বাটনে ক্লিক করলে রকেট পেমেন্ট
        <span className="font-semibold text-my-gray-100"> Popup </span>
        ওপেন হবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        আপনি যে নাম্বার থেকে পেমেন্ট করবেন সেই রকেট নাম্বার দিতে হবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        রকেট ভেরিফিকেশন কোড পাঠাবে আপনার মোবাইলে সেটি বসাতে হবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        যেভাবে পেমেন্ট করবে এমাউন্ট দেখে সব কিছু ঠিক থাকলে সিন কোড দিতে বলবে
        রকেট।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-my-gray-100">Confirm </span>এ ক্লিক
        করলে পেমেন্ট হয়ে যাবে, আপনার অ্যাকাউন্ট থেকে।
      </li>
    </ul>
  );
};

export default RocketPaymentDetails;
