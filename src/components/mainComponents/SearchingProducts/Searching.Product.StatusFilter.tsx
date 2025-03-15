"use client";

import { Dispatch, SetStateAction } from "react";

interface StatusFilterProps {
  selectedStatus: string | undefined; // Only one status can be selected
  onStatusChange: Dispatch<SetStateAction<string | undefined>>; // Function to update the selected status
  statusOptions: string[]; // List of available status options
}

const StatusFilter = ({
  selectedStatus,
  onStatusChange,
  statusOptions,
}: StatusFilterProps) => {
  const handleStatusToggle = (status: string) => {
    // If the clicked status is already selected, deselect it
    if (selectedStatus === status) {
      onStatusChange(undefined); // Clear the selection
    } else {
      onStatusChange(status); // Select the new status
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Status</h4>
      <div className="space-y-2">
        {statusOptions.map((status) => (
          <label
            key={status}
            className="flex cursor-pointer items-center space-x-2"
          >
            <input
              type="checkbox" // Use checkbox input
              checked={selectedStatus === status} // Check if the current status is selected
              onChange={() => handleStatusToggle(status)} // Handle status selection
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm capitalize text-gray-600">{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StatusFilter;
