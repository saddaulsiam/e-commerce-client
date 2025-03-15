"use client";

import { Slider } from "@/components/ui/slider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface PriceFilterProps {
  value: number[];
  onChange: Dispatch<SetStateAction<number[]>>;
  max: number;
}

const PriceFilter = ({ value, onChange, max }: PriceFilterProps) => {
  const [localValue, setLocalValue] = useState<number[]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: number[]) => {
    const [min, max] = newValue;
    setLocalValue([min, max]);
    onChange([min, max]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">
          Price: ${localValue[0]} - ${localValue[1]}
        </span>
        <span className="text-gray-400">Max: ${max}</span>
      </div>
      <Slider
        value={localValue}
        onValueChange={handleChange}
        min={0}
        max={max}
        step={10}
        className="cursor-pointer"
      />
    </div>
  );
};

export default PriceFilter;
