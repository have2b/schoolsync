'use client';

import { z } from 'zod';

const createTeacherSchema = z.object({
  name: z.string().min(2).max(50),
  degree: z.string().max(50).optional(),
  major: z.string().max(50).optional(),
  departmentId: z.string().max(50).optional(),
  avatar: z.string().max(50).optional(),
});

const updateTeacherSchema = z.object({
  code: z.string(),
  name: z.string().min(2).max(50),
  degree: z.string().max(50).optional(),
  major: z.string().max(50).optional(),
  departmentId: z.string().max(50).optional(),
  avatar: z.string().max(50).optional(),
});

export { createTeacherSchema, updateTeacherSchema };
