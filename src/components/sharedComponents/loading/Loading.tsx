import React from "react";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-12 w-12">
        <div className="absolute h-full w-full animate-pulse rounded-full border-t-4 border-b-2 border-secondary"></div>
        <div className="absolute top-0 left-0 h-full w-full animate-spin rounded-full border-t-2 border-b-4 border-purple-500"></div>
      </div>
    </div>
  );
};

export default Loading;
