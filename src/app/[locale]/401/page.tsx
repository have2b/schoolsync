'use client';

import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Unauthorized() {
  const t = useTranslations('error');
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-orange-500 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h1 className="text-9xl font-extrabold tracking-widest text-white">401</h1>
          <div className="absolute left-[20px] top-[100px] -translate-x-1/2 rotate-12 transform rounded bg-orange-500 px-2 text-sm text-blue-900">
            {t('types.401.title')}
          </div>
        </motion.div>
        <motion.p
          className="mt-4 text-xl text-blue-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {t('types.401.description')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-orange-400 px-6 py-3 text-lg font-medium text-blue-900 transition-colors duration-300 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <motion.span
              className="mr-2"
              animate={{ x: [0, -4, 4, -4, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
            >
              <ArrowLeft className="h-6 w-6" />
            </motion.span>
            {t('actions.goHome')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
