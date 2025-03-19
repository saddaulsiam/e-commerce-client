"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = ["Cart", "Checkout", "Payment"];

const ProgressSteps = () => {
  const path = usePathname();
  const currentPath = path.replace("/", "");
  const currentStep = steps.findIndex(
    (step) => step.toLowerCase() === currentPath,
  );

  return (
    <div className="flex items-center py-6 sm:py-10">
      {steps.map((step, index) => {
        const isActiveBg = index <= currentStep;
        const isActiveBorder = index < currentStep;

        return (
          <div key={step} className="flex items-center">
            <Link href={`/${step.toLowerCase()}`}>
              <Button
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all sm:px-6 sm:py-2 sm:text-sm ${
                  isActiveBg ? "bg-primary text-white" : "bg-slate-200"
                }`}
              >
                <span>
                  {index + 1}. {step}
                </span>
              </Button>
            </Link>
            {index < steps.length - 1 && (
              <div
                className={`w-12 border-t-4 transition-all sm:w-20 ${
                  isActiveBorder ? "border-primary" : "border-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
