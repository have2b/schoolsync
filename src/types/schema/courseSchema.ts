'use client';

import { z } from 'zod';

const createCourseSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  credit: z.number(),
  lesson: z.number(),
});

const updateCourseSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  credit: z.number(),
  lesson: z.number(),
});

export { createCourseSchema, updateCourseSchema };
