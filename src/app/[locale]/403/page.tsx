'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Forbidden() {
  const t = useTranslations('error');
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-blue-600 via-blue-400 to-orange-400 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-9xl font-extrabold tracking-widest text-white">403</h1>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 transform"
          >
            <Lock className="h-20 w-20 text-orange-400" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="inline-block rounded-full bg-blue-900 px-4 py-2 text-sm text-orange-400"
        >
          {t('types.403.title')}
        </motion.div>
        <motion.p
          className="mt-4 text-xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {t('types.403.description')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
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
