"use client";

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import { useAddAddressToUserMutation } from "@/redux/features/auth/authApi";

const DashboardCustomersAddressFillUpForm = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const { setLoadUser } = useAuth();

  // redux sate
  const { user } = useAppSelector(({ state }) => state.auth);

  // State
  const [allRegions, setAllRegions] = useState([]);
  const [region, setRegion] = useState("");
  const [allCity, setAllCity] = useState([]);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [addressTypeBtn, setAddressTypeBtn] = useState("home");

  // redux Api call
  const [addAddress, { error }] = useAddAddressToUserMutation();

  useEffect(() => {
    fetch("https://bdapi.p.rapidapi.com/v1.1/divisions", {
      headers: {
        "X-RapidAPI-Key": "6d31af789dmsh7afaaed904d3365p159388jsnd11bfff6e4f5",
        "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setAllRegions(data);
      });

    fetch(`https://bdapi.p.rapidapi.com/v1.1/division/${region}`, {
      headers: {
        "X-RapidAPI-Key": "6d31af789dmsh7afaaed904d3365p159388jsnd11bfff6e4f5",
        "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setAllCity(data);
      });

    const currentCity = allCity?.find((c) => c.district === city);
    setArea(currentCity);
  }, [region, allCity, city]);

  // added new address
  const onSubmit = (data) => {
    data.addressType = addressTypeBtn;

    addAddress({ id: user._id, data: data }).then((res) => {
      if (res?.data?.status === "success") {
        toast.success(res.data?.message);
        reset();
        setLoadUser(true);
      }
    });
  };

  if (error) {
    toast.error(error.data?.message);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 rounded-sm bg-white p-5 py-10">
        <h4 className="pl-5 text-lg font-medium text-my-gray-200">Shipping Address</h4>
        <div className="mt-5 grid grid-cols-1 gap-5 rounded-md bg-white p-5 sm:grid-cols-2">
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="name">
              Full Name
            </label>
            <input
              {...register("name", { required: true })}
              // defaultValue={details?.name}
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
              placeholder="Enter your full name"
              type="text"
              required
              name="name"
              id="name"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="region">
              Region
            </label>
            <select
              {...register("region", { required: true })}
              id="region"
              name="region"
              className="h-10 w-full cursor-pointer rounded border disabled:cursor-not-allowed"
              placeholder="Please choose your region "
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">
                {/* {details?.region
                    ? details.region
                    : "Please choose your region"}
                  */}
                Please choose your region
              </option>
              {allRegions?.map((region, i) => (
                <option value={region.division} key={i}>
                  {region.division}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="phone">
              Phone Number
            </label>
            <input
              {...register("phone", { required: true })}
              // defaultValue={details?.phone}
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
              placeholder="Please enter your phone number"
              type="number"
              required
              name="phone"
              id="phone"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="city">
              City
            </label>
            <select
              id="city"
              name="city"
              {...register("city", { required: true })}
              // disabled={details?.region || region !== "" ? false : true}
              disabled={region !== "" ? false : true}
              className="h-10 w-full cursor-pointer rounded border disabled:cursor-not-allowed"
              placeholder="Please choose your city"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">
                {/* {details?.region ? details.city : " Please choose your city"} */}
                Please choose your city
              </option>
              {allCity?.map((city, i) => (
                <option value={city.district} key={i}>
                  {city.district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="email">
              Email (Optional)
            </label>
            <input
              {...register("email")}
              // defaultValue={details?.email}
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
              placeholder="Please enter"
              type="text"
              required
              name="email"
              id="email"
            />
          </div>
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="area">
              Area
            </label>
            <select
              {...register("area", { required: true })}
              // disabled={details?.city || city !== "" ? false : true}
              disabled={city !== "" ? false : true}
              id="area"
              name="area"
              className="h-10 w-full cursor-pointer rounded border disabled:cursor-not-allowed"
              placeholder="Please choose your area"
            >
              <option value="">
                {/* {details?.city ? details.area : "Please choose your area"} */}
                Please choose your area
              </option>
              {area?.upazilla?.map((up, i) => (
                <option value={up} key={i}>
                  {up}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end justify-between">
            <span
              className={`${
                addressTypeBtn === "home" ? "border-2 border-green-400" : "border-dashed border-gray-200"
              } ${
                router.route === "/details" ? " px-16" : "px-20"
              } btn bg-white text-black shadow-md hover:bg-slate-200`}
              onClick={() => setAddressTypeBtn("home")}
            >
              Home
            </span>

            <span
              className={`${
                addressTypeBtn === "office" ? "border-2 border-green-400" : "border-dashed border-gray-200"
              } ${
                router.route === "/details" ? " px-16" : "px-20"
              } btn bg-white text-black shadow-md hover:bg-slate-200`}
              onClick={() => setAddressTypeBtn("office")}
            >
              Office
            </span>
          </div>
          <div>
            <label className="text-sm text-my-gray-200" htmlFor="address">
              Address
            </label>
            <input
              {...register("address", { required: true })}
              // defaultValue={details?.address}
              className="h-10 w-full rounded border px-2 outline-1 focus:outline-primary"
              type="text"
              required
              name="address"
              id="address"
              placeholder="For Example: House# 123, Street# 123, ABC Road"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="mt-5 w-full bg-primary py-2 text-base font-semibold text-white">
        Create New Address
      </button>
    </form>
  );
};

export default DashboardCustomersAddressFillUpForm;
