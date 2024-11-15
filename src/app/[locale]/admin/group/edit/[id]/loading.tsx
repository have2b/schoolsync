const LoadingForm = () => {
  return (
    <div className="mt-10 w-full animate-pulse space-y-10 rounded-md bg-white p-10 shadow-xl">
      <div className="h-6 w-1/4 rounded bg-gray-200"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1 md:col-span-1">
          <div className="h-10 rounded bg-gray-200"></div>
          <div className="my-4 h-10 rounded bg-gray-200"></div>
          <div className="my-4 h-10 rounded bg-gray-200"></div>
          <div className="my-4 h-10 rounded bg-gray-200"></div>
        </div>

        <div className="col-span-1 h-full md:col-span-1">
          <div className="relative h-48 rounded-lg bg-background p-2">
            <div className="flex h-full w-full flex-col items-center justify-center p-8">
              <div className="mx-auto h-16 rounded bg-gray-200"></div>
              <div className="mx-auto my-4 h-6 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="h-10 w-20 rounded bg-gray-200"></div>
        <div className="h-10 w-20 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingForm;
