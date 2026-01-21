import z from 'zod';
import { createUserSchema, updateProfileSchema } from './create-user.dto';

// Update User
export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .partial()
  .extend({
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Le mot de passe actuel est requis pour changer le mot de passe',
      path: ['currentPassword'],
    },
  );

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

// User Query Filters
export const userFiltersSchema = z.object({
  search: z.string().optional(),
  role: z.enum(['admin', 'manager', 'member', 'guest']).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'email', 'username', 'lastLoginAt']).default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
});

export type UserFiltersDto = z.infer<typeof userFiltersSchema>;