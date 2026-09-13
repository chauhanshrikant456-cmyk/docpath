import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().regex(/^\d{10}$/, 'Mobile number must be 10 digits').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  mobileNumber: z.string().regex(/^\d{10}$/).optional(),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'Other']).optional(),
  state: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  educationLevel: z.string().optional(),
  course: z.string().optional(),
  institution: z.string().optional(),
  year: z.string().optional(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  annualFamilyIncome: z.number().optional()
});

export { registerSchema, loginSchema, updateProfileSchema };
