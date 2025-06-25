"use client";

import Lottie from "lottie-react";
import loading from "@/../public/animation/loading.json";

const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-40 w-40">
        <Lottie animationData={loading} />
      </div>
    </div>
  );
};

export default Loading;
