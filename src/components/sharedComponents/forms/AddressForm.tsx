"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useAddNewAddressMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Street {
  division: string;
}

interface City {
  district: string;
  upazilla: string[];
}

const AddressForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { setLoadUser } = useAuth();

  // Redux state
  const { user } = useAppSelector(({ state }) => state.auth);
  // Redux API call
  const [addAddress, { isLoading }] = useAddNewAddressMutation();

  // State variables
  const [allStreet, setAllStreet] = useState<Street[]>([]);
  const [allCity, setAllCity] = useState<City[]>([]);
  const [area, setArea] = useState<string[]>([]);

  const [currentStreet, setCurrentStreet] = useState<string>("");
  const [currentCity, setCurrentCity] = useState<string>("");

  // Fetch all Streets on mount
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://bdapi.p.rapidapi.com/v1.1/divisions",
          {
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
              "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
            },
          },
        );
        const { data } = await response.json();
        setAllStreet(data);
      } catch (error) {
        console.error("Error fetching Streets:", error);
      }
    })();
  }, []);

  // Fetch cities when Street changes
  useEffect(() => {
    if (!currentStreet) return;

    (async () => {
      try {
        const response = await fetch(
          `https://bdapi.p.rapidapi.com/v1.1/division/${currentStreet}`,
          {
            headers: {
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
              "X-RapidAPI-Host": "bdapi.p.rapidapi.com",
            },
          },
        );
        const { data } = await response.json();
        setAllCity(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    })();
  }, [currentStreet]);

  // Set area when city changes
  useEffect(() => {
    const selectedCity = allCity.find((c) => c.district === currentCity);
    setArea(selectedCity?.upazilla ?? []);
  }, [allCity, currentCity]);

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addAddress({ id: user?._id, data }).unwrap();
      if (res.success) {
        toast.success("Address added successfully!");
        reset();
        setLoadUser(true);
      }
    } catch (error: any) {
      toast.error(error.massage || "Failed to add address");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl space-y-6 rounded-lg bg-white p-6 shadow-md"
    >
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-700">Shipping Address</h2>

      {/* Personal Details */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Full Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="Enter your full name"
            className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">
            Phone Number
          </label>
          <input
            {...register("phoneNumber", { required: true })}
            type="number"
            placeholder="Enter your phone number"
            className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>

      {/* Address Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Street</label>
          <select
            {...register("street", { required: true })}
            className="w-full cursor-pointer rounded-md border bg-white px-3 py-2"
            onChange={(e) => setCurrentStreet(e.target.value)}
          >
            <option value="">Select a street</option>
            {allStreet.map((street, i) => (
              <option key={i} value={street.division}>
                {street.division}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-gray-600">City</label>
          <select
            {...register("city", { required: true })}
            className="w-full cursor-pointer rounded-md border bg-white px-3 py-2"
            disabled={!currentStreet}
            onChange={(e) => setCurrentCity(e.target.value)}
          >
            <option value="">Select a city</option>
            {allCity.map((city, i) => (
              <option key={i} value={city.district}>
                {city.district}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-600">Area</label>
        <select
          {...register("area", { required: true })}
          className="w-full cursor-pointer rounded-md border bg-white px-3 py-2"
          disabled={!currentCity}
        >
          <option value="">Select an area</option>
          {area.map((up, i) => (
            <option key={i} value={up}>
              {up}
            </option>
          ))}
        </select>
      </div>

      {/* Address Input */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">Full Address</label>
        <input
          {...register("address", { required: true })}
          type="text"
          placeholder="House# 123, Street# 123, ABC Road"
          className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          Email (Optional)
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-md border px-3 py-2 focus:border-primary focus:ring-primary"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full rounded-md bg-primary py-2 text-lg font-medium text-white transition duration-200 hover:bg-opacity-90"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Create New Address"}
      </Button>
    </form>
  );
};

export default AddressForm;
