'use client';

import { z } from 'zod';

const createCourseSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  credit: z.string().min(1).max(2),
  lesson: z.string().min(1).max(2),
  semester: z.string().min(1).max(2),
  year: z.string().min(4).max(4),
  startedAt: z.date(),
  endedAt: z.date(),
  teacherId: z.string().max(50),
});

const updateCourseSchema = z.object({
  code: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  credit: z.string().min(1).max(2),
  lesson: z.string().min(1).max(2),
  semester: z.string().min(1).max(2),
  year: z.string().min(4).max(4),
  startedAt: z.date(),
  endedAt: z.date(),
  teacherId: z.string().max(50),
});

export { createCourseSchema, updateCourseSchema };
