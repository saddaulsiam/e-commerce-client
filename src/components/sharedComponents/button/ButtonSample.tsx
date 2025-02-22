const ButtonSample = () => {
  return (
    <div className="flex flex-col space-y-5">
      {/* Primary Button */}
      <div className="space-x-1">
        <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
        <button className="rounded-lg bg-indigo-600 px-5 py-3 text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
        <button className="rounded-lg bg-indigo-600 px-6 py-3.5 text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
      </div>

      {/* Outline Button */}
      <div className="space-x-1">
        <button className="rounded-lg border border-gray-400 px-3 py-1.5 text-sm text-gray-700 duration-150 hover:border-indigo-600 active:shadow-lg">
          Button
        </button>
        <button className="rounded-lg border border-gray-400 px-4 py-2 text-gray-700 duration-150 hover:border-indigo-600 active:shadow-lg">
          Button
        </button>
        <button className="rounded-lg border border-gray-400 px-5 py-3 text-gray-700 duration-150 hover:border-indigo-600 active:shadow-lg">
          Button
        </button>
        <button className="rounded-lg border border-gray-400 px-6 py-3.5 text-gray-700 duration-150 hover:border-indigo-600 active:shadow-lg">
          Button
        </button>
      </div>

      {/* Disabled Button */}
      <div className="space-x-1">
        <button className="cursor-not-allowed rounded-lg bg-indigo-300 px-3 py-1.5 text-sm text-white">
          Button
        </button>
        <button className="cursor-not-allowed rounded-lg bg-indigo-300 px-4 py-2 text-white">
          Button
        </button>
        <button className="cursor-not-allowed rounded-lg bg-indigo-300 px-5 py-3 text-white">
          Button
        </button>
        <button className="cursor-not-allowed rounded-lg bg-indigo-300 px-6 py-3.5 text-white">
          Button
        </button>
      </div>

      {/* Secondary Button */}
      <div className="space-x-1">
        <button className="rounded-lg bg-indigo-50 px-3 py-1.5 text-sm text-indigo-600 ring-indigo-300 duration-150 hover:bg-indigo-100 active:bg-indigo-200 active:ring-1">
          Button
        </button>
        <button className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 ring-indigo-300 duration-150 hover:bg-indigo-100 active:bg-indigo-200 active:ring-1">
          Button
        </button>
        <button className="rounded-lg bg-indigo-50 px-5 py-3 text-indigo-600 ring-indigo-300 duration-150 hover:bg-indigo-100 active:bg-indigo-200 active:ring-1">
          Button
        </button>
        <button className="rounded-lg bg-indigo-50 px-6 py-3.5 text-indigo-600 ring-indigo-300 duration-150 hover:bg-indigo-100 active:bg-indigo-200 active:ring-1">
          Button
        </button>
      </div>

      {/* Pill Button */}
      <div className="space-x-1">
        <button className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
        <button className="rounded-full bg-indigo-600 px-4 py-2 text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
        <button className="rounded-full bg-indigo-600 px-5 py-3 text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
        <button className="rounded-full bg-indigo-600 px-6 py-3.5 text-white duration-150 hover:bg-indigo-700 active:shadow-lg">
          Button
        </button>
      </div>

      {/* Button With Icon And Text */}
      <div className="space-y-1">
        <button className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-1.5 text-sm text-indigo-600 duration-150 hover:bg-indigo-100 active:bg-indigo-200">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 duration-150 hover:bg-indigo-100 active:bg-indigo-200">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-50 px-5 py-3 text-indigo-600 duration-150 hover:bg-indigo-100 active:bg-indigo-200">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-indigo-50 px-6 py-3.5 text-indigo-600 duration-150 hover:bg-indigo-100 active:bg-indigo-200">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>
      </div>

      {/* Primary Button With Icon And Text */}
      <div className="space-y-1">
        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-white duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
          Button
        </button>
      </div>

      {/* Button With Icon */}
      <div className="space-x-1">
        <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-indigo-50 duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
        </button>
        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-indigo-50 duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
        </button>
        <button className="rounded-lg bg-indigo-600 px-5 py-3 text-indigo-50 duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
        </button>
        <button className="rounded-lg bg-indigo-600 px-6 py-3.5 text-indigo-50 duration-150 hover:bg-indigo-700 active:bg-indigo-800">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 480"
            fill="currentColor"
          >
            <path d="M0 0h640v480H0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ButtonSample;
