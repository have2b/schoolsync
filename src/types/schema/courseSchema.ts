'use client';

import { z } from 'zod';

const createCourseSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  credit: z.string().min(1).max(2),
  lesson: z.string().min(1).max(2),
});

const updateCourseSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  credit: z.string().min(1).max(2),
  lesson: z.string().min(1).max(2),
});

export { createCourseSchema, updateCourseSchema };
