import z from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1, 'Le contenu ne peut pas être vide'),
  taskId: z.string().uuid('UUID de tâche invalide'),
  parentId: z.string().uuid('UUID de parent invalide').optional(),
  attachments: z.array(z.object({
    url: z.string().url('URL invalide'),
    type: z.string(),
    name: z.string(),
    size: z.number().positive(),
  })).optional().default([]),
});

export type CreateCommentDto = z.infer<typeof createCommentSchema>;
