'use client';

import { Button } from '@/components';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto mt-12 w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-6">
        <div className="animate-spin-slow rounded-full border-4 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
          Oops! An Error Occurred
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Something went wrong. Our team has been notified and is already on it.
        </p>
        <div className="w-full rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-800">
          <p className="font-mono text-xs text-gray-700 dark:text-gray-400">
            <strong>Error Message:</strong> {error.message}
          </p>
        </div>
        <Button
          onClick={() => reset()}
          className="mt-4 w-full max-w-xs transform rounded-lg bg-blue-500 py-2 text-white shadow transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Try Again
        </Button>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          If you keep experiencing this issue, please{' '}
          <a href="/contact" className="text-blue-500 hover:underline dark:text-blue-400">
            contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
