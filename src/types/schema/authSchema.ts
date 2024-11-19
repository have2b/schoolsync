'use client';

import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
});

const updateStudentProfileSchema = z.object({
  code: z.string(),
  name: z.string().min(2).max(50),
  dob: z.date(),
  gender: z.string().max(50),
  address: z.string().max(50),
  phone: z.string().max(50),
  group: z.string().max(50),
  avatar: z.string().max(50),
  department: z.string().max(50),
});

const updateTeacherProfileSchema = z.object({
  code: z.string(),
  name: z.string().min(2).max(50),
  email: z.string().max(50),
  major: z.string().max(50),
  degree: z.string().max(50),
  avatar: z.string().max(50),
});

export { loginSchema, updateStudentProfileSchema, updateTeacherProfileSchema };
