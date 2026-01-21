import { Comments } from 'src/comments/entities/comment.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('tasks')
@Index(['title'])
@Index(['dueDate'])
@Index(['status'])
@Index(['priority'])
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ['todo', 'in_progress', 'review', 'done', 'blocked'],
    default: 'todo',
  })
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  })
  priority: 'low' | 'medium' | 'high' | 'critical';

  @Column({ type: 'int', default: 0 })
  estimatedHours: number;

  @Column({ type: 'int', default: 0 })
  actualHours: number;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown>; // Pour données flexibles

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true })
  @JoinColumn({ name: 'assigned_to_id' })
  assignedTo: User;

  @ManyToOne(() => Project, (project) => project.tasks, { nullable: true })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToMany(() => Comments, (comment) => comment.task)
  comments: Comments[];

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  @JoinTable({
    name: 'task_tags',
    joinColumn: { name: 'task_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn() // Soft delete
  deletedAt: Date;

  // Propriétés calculées (non persistées)
  isOverdue(): boolean {
    if (!this.dueDate) return false;
    return new Date() > this.dueDate && this.status !== 'done';
  }

  progressPercentage(): number {
    const statusOrder = ['todo', 'in_progress', 'review', 'done'];
    const currentIndex = statusOrder.indexOf(this.status);
    return (currentIndex / (statusOrder.length - 1)) * 100;
  }
}
