"use client";

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
    <div className="flex items-center py-10">
      {steps.map((step, index) => {
        const isActiveBg = index <= currentStep;
        const isActiveBorder = index < currentStep;
        return (
          <div key={step} className="flex items-center">
            <Link href={`/${step.toLowerCase()}`}>
              <button
                className={`cursor-pointer rounded-full px-6 py-2 text-sm font-semibold ${
                  isActiveBg ? "bg-primary text-white" : "bg-slate-200"
                }`}
              >
                <span className="hidden sm:block">
                  {index + 1}. {step}
                </span>
                <span className="sm:hidden">{step}</span>
              </button>
            </Link>
            {index < steps.length - 1 && (
              <div
                className={`w-20 border-t-4 ${
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
