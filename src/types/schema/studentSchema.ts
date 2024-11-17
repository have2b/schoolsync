'use client';

import { z } from 'zod';

const createStudentSchema = z.object({
  name: z.string().min(2).max(50),
  dob: z.date(),
  gender: z.string().max(50),
  address: z.string().max(50),
  phone: z.string().max(50),
  groupId: z.string().max(50),
  avatar: z.string().max(50),
});

const updateStudentSchema = z.object({
  code: z.string(),
  name: z.string().min(2).max(50),
  dob: z.date(),
  gender: z.string().max(50),
  address: z.string().max(50),
  phone: z.string().max(50),
  groupId: z.string().max(50),
  avatar: z.string().max(50),
});

export { createStudentSchema, updateStudentSchema };