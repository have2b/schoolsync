'use client';

import { z } from 'zod';

const createGroupSchema = z.object({
  name: z.string().min(2).max(50),
  capacity: z.string().min(1).max(2),
  departmentId: z.string().max(50),
  teacherId: z.string().max(50),
});

const updateGroupSchema = z.object({
  code: z.string(),
  name: z.string().min(2).max(50),
  capacity: z.string().min(1).max(2),
  departmentId: z.string().max(50),
  teacherId: z.string().max(50),
});

export { createGroupSchema, updateGroupSchema };
