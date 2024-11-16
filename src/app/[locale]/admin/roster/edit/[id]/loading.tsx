const LoadingForm = () => {
  return (
    <div className="mt-10 w-full animate-pulse space-y-10 rounded-md bg-white p-10 shadow-xl">
      <div className="h-6 w-1/2 rounded bg-gray-200"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="h-16 w-full rounded bg-gray-200"></div>
        <div className="h-16 rounded bg-gray-200"></div>
        <div className="h-16 rounded bg-gray-200"></div>
        <div className="h-16 rounded bg-gray-200"></div>
        <div className="h-16 rounded bg-gray-200"></div>
      </div>
      <div className="flex items-center justify-end gap-3">
        <div className="h-10 rounded bg-gray-200"></div>
        <div className="h-10 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingForm;
