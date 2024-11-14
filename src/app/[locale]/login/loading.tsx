const LoadingSkeleton = () => {
  return (
    <div className="relative grid min-h-screen grid-cols-2">
      <div className="absolute right-4 top-4 z-10">
        <div className="h-6 w-20 animate-pulse rounded bg-gray-400"></div>
      </div>
      <div className="relative bg-orange-400/80">
        <div className="absolute inset-0 animate-pulse bg-gray-500"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-6 h-48 w-48 animate-pulse rounded-full bg-gray-300"></div>
          <div className="h-16 w-48 animate-pulse rounded bg-white"></div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-blue-900 p-8">
        <div className="w-full max-w-md rounded-lg bg-white p-8">
          <div className="mb-6 h-6 w-32 animate-pulse rounded bg-gray-400 text-center text-2xl font-bold uppercase text-blue-900"></div>

          <form className="space-y-8">
            <div className="h-6 w-48 animate-pulse rounded bg-gray-400"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="mt-4 h-6 w-48 animate-pulse rounded bg-gray-400"></div>
            <div className="h-10 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-12 w-full animate-pulse rounded bg-indigo-500"></div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            <div className="h-4 w-64 animate-pulse rounded bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
