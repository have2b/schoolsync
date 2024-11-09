'use client';

import { z } from 'zod';

const createDepartmentSchema = z.object({
  name: z.string().min(2).max(50),
  detail: z.string().max(50).optional(),
});

const updateDepartmentSchema = z.object({
  departmentCode: z.string(),
  name: z.string().min(2).max(50),
  detail: z.string().max(50).optional(),
});

export { createDepartmentSchema, updateDepartmentSchema };
