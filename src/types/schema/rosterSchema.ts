'use client';

import { z } from 'zod';

const createRosterSchema = z.object({
  capacity: z.string().min(1).max(2),
  semester: z.string().min(1).max(2),
  year: z.string().min(4).max(4),
  startDate: z.date(),
  endDate: z.date(),
  courseId: z.string().max(50),
  teacherId: z.string().max(50),
});

const updateRosterSchema = z.object({
  code: z.string(),
  name: z.string().min(2).max(50),
  capacity: z.string().min(1).max(2),
  semester: z.string().min(1).max(2),
  year: z.string().min(4).max(4),
  startDate: z.date(),
  endDate: z.date(),
  courseId: z.string().max(50),
  teacherId: z.string().max(50),
});

export { createRosterSchema, updateRosterSchema };
