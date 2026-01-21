import z from "zod";

export const createUserSchema = z.object({
  email: z.email('Email invalide'),
  username: z.string()
    .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
    .max(50, 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .optional(),
  fullName: z.string().min(2).optional(),
  role: z.enum(['admin', 'manager', 'member', 'guest']).optional().default('member'),
  status: z.enum(['active', 'inactive', 'suspended']).optional().default('active'),
  avatarUrl: z.string().url('URL invalide').optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema
  .omit({ password: true })
  .partial()
  .extend({
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).optional(),
  })
  .refine(data => {
    if (data.newPassword && !data.currentPassword) {
      return false;
    }
    return true;
  }, {
    message: 'Le mot de passe actuel est requis pour changer le mot de passe',
    path: ['currentPassword'],
  });
export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export const updateProfileSchema = createUserSchema