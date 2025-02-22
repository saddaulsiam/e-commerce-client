import React from "react";
import { FcOk } from "react-icons/fc";

const NagodPaymentDetails = () => {
  return (
    <ul className="space-y-3 text-base font-light text-my-gray-200">
      <li>
        <FcOk className="mr-3 inline" />
        <span className="font-semibold text-my-gray-100">Nagad Payment </span>
        সিলেক্ট করে কমপ্লিট পেমেন্ট বাটনে ক্লিক করলে নগদ পেমেন্ট
        <span className="font-semibold text-my-gray-100"> Popup </span>
        ওপেন হবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        আপনি যে নাম্বার থেকে পেমেন্ট করবেন সেই নগদ নাম্বার দিতে হবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        নগদ ভেরিফিকেশন কোড পাঠাবে আপনার মোবাইলে সেটি বসাতে হবে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        এমাউন্ট দেখে সব কিছু ঠিক থাকলে পিন কোড দিতে বলবে নগদ
        <span className="font-semibold text-my-gray-100"> Confirm </span>এ ক্লিক
        করলে পেমেন্ট হয়ে যাবে, আপনার অ্যাকাউন্ট থেকে।
      </li>
      <li>
        <FcOk className="mr-3 inline" />
        পেমেন্ট সংক্রান্ত যেকোন জিজ্ঞাসা থাকলে আমাদের সাথে যোগাযোগ করুন এই
        নাম্বারে 01311333277
      </li>
    </ul>
  );
};

export default NagodPaymentDetails;
