"use client";

import { Dispatch, SetStateAction } from "react";

interface TProps {
  selectedColor: string | undefined;
  setSelectedColor: Dispatch<SetStateAction<string | undefined>>;
  colors: string[];
}

export const ColorFilter = ({
  selectedColor,
  setSelectedColor,
  colors,
}: TProps) => {
  const handleColorToggle = (colorValue: string) => {
    if (selectedColor?.includes(colorValue)) {
      setSelectedColor(undefined);
    } else {
      setSelectedColor(colorValue);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900">Color</h4>
      <div className="flex flex-wrap gap-2">
        {colors.map((color: string, i: number) => (
          <button
            key={i}
            onClick={() => handleColorToggle(color)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
              selectedColor === color ? "border-primary" : "border-gray-200"
            }`}
            style={{ backgroundColor: color }}
            aria-label={color}
          >
            {selectedColor === color && (
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
