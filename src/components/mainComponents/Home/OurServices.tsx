import { AiOutlineSafety } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const OurServices = () => {
  return (
    <section className="bg-accent px-2 py-16">
      <div className="container grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center justify-center space-y-3 rounded-md bg-white px-6 py-10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
          <span className="rounded-full bg-gray-200 p-4">
            <TbTruckDelivery className="text-4xl text-primary" />
          </span>
          <h2 className="text-lg font-semibold text-my-gray-200">
            Worldwide Delivery
          </h2>
          <p className="text-base text-my-gray-100">
            We offer competitive prices on our 100 million plus product any
            range.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 rounded-md bg-white px-6 py-10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
          <span className="rounded-full bg-gray-200 p-4">
            <MdPayment className="text-4xl text-primary" />
          </span>
          <h2 className="text-lg font-semibold text-my-gray-200">
            Safe Payment
          </h2>
          <p className="text-base text-my-gray-100">
            We offer competitive prices on our 100 million plus product any
            range.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 rounded-md bg-white px-6 py-10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
          <span className="rounded-full bg-gray-200 p-4">
            <AiOutlineSafety className="text-4xl text-primary" />
          </span>
          <h2 className="text-lg font-semibold text-my-gray-200">
            Shop With Confidence
          </h2>
          <p className="text-base text-my-gray-100">
            We offer competitive prices on our 100 million plus product any
            range.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-3 rounded-md bg-white px-6 py-10 shadow-sm transition-shadow duration-300 hover:shadow-lg">
          <span className="rounded-full bg-gray-200 p-4">
            <BiSupport className="text-4xl text-primary" />
          </span>
          <h2 className="text-lg font-semibold text-my-gray-200">
            24/7 Support
          </h2>
          <p className="text-base text-my-gray-100">
            We offer competitive prices on our 100 million plus product any
            range.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
