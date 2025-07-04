"use client";

import { useMakeAdminMutation } from "@/redux/features/admin/adminApi";
import { useState } from "react";
import { toast } from "react-toastify";

const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [makeAdmin, { isLoading }] = useMakeAdminMutation(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Email is required.");
        return;
      }

      const res = await makeAdmin(email).unwrap();
      if (res.success) {
        toast.success("User has been made admin successfully.");
      }
      setEmail("");
    } catch (err: any) {
      toast.error(err.message || "Failed to make user admin.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Make Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {isLoading ? "Processing..." : "Make Admin"}
        </button>
      </form>
    </div>
  );
};

export default MakeAdmin;
