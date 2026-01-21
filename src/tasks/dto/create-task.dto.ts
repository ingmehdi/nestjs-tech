// src/tasks/dto/task.dto.ts
import { z } from 'zod';

// Create Task
export const createTaskSchema = z.object({
  title: z.string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done', 'blocked']).optional().default('todo'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional().default('medium'),
  estimatedHours: z.number().int().min(0).max(1000).optional().default(0),
  dueDate: z.string().datetime('Date invalide').optional(),
  assignedToId: z.uuid('UUID invalide').optional(),
  projectId: z.uuid('UUID invalide').optional(),
  tagIds: z.array(z.uuid()).optional().default([]),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

// Update Task
export const updateTaskSchema = createTaskSchema.partial();

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;

// Task Query Filters
export const taskFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done', 'blocked']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  assignedToId: z.uuid().optional(),
  createdById: z.uuid().optional(),
  projectId: z.uuid().optional(),
  tagIds: z.array(z.uuid()).optional(),
  dueDateFrom: z.string().datetime().optional(),
  dueDateTo: z.string().datetime().optional(),
  overdue: z.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'dueDate', 'priority', 'title']).default('createdAt'),
  sortOrder: z.enum(['ASC', 'DESC']).default('DESC'),
  include: z.array(z.enum(['comments', 'tags', 'assignedTo', 'createdBy', 'project'])).optional(),
});

export type TaskFiltersDto = z.infer<typeof taskFiltersSchema>;

// Bulk Update Tasks
export const bulkUpdateTasksSchema = z.object({
  taskIds: z.array(z.string().uuid()).min(1, 'Au moins une tâche est requise'),
  data: updateTaskSchema,
});

export type BulkUpdateTasksDto = z.infer<typeof bulkUpdateTasksSchema>;

// Task Statistics
export const taskStatsSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  groupBy: z.enum(['day', 'week', 'month', 'status', 'priority']).optional().default('status'),
});

export type TaskStatsDto = z.infer<typeof taskStatsSchema>;