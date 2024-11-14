import { Card, CardContent, Skeleton } from '@/components';

const LoadingSkeleton = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-40 space-y-4 bg-gray-100 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gray-100 p-4">
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Content */}
        <Card className="m-4">
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
