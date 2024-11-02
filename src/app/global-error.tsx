'use client';

import { Button } from '@/components/';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 text-center shadow-xl dark:bg-gray-800">
          <div className="animate-bounce rounded-full bg-red-100 p-3 dark:bg-red-900">
            <AlertTriangle className="mx-auto h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            We apologize for the inconvenience. Our team has been notified and is working on a fix.
          </p>
          <div className="mt-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">Error: {error.message}</p>
          </div>
          <div className="mt-6">
            <Button onClick={() => reset()} className="w-full animate-pulse">
              Try again
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </body>
    </html>
  );
}
