import z from 'zod';

// Login
export const loginSchema = z.object({
  email: z.email('Email invalide'),
  password: z
    .string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  rememberMe: z.boolean().optional().default(false),
});

export type LoginDto = z.infer<typeof loginSchema>;

// Register
export const registerSchema = z
  .object({
    email: z.email('Email invalide'),
    username: z
      .string()
      .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
      .max(50, "Le nom d'utilisateur ne peut pas dépasser 50 caractères")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Le nom d'utilisateur ne peut contenir que des lettres, chiffres et underscores",
      ),
    password: z
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
      .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
      .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
      .regex(
        /[^A-Za-z0-9]/,
        'Le mot de passe doit contenir au moins un caractère spécial',
      ),
    confirmPassword: z.string(),
    fullName: z
      .string()
      .min(2, 'Le nom complet doit contenir au moins 2 caractères')
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type RegisterDto = z.infer<typeof registerSchema>;

// Change Password
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
  newPassword: z
    .string()
    .min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
});

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
