import { Exclude } from 'class-transformer';
import { Comments } from 'src/comments/entities/comment.entity';
import { Notifications } from 'src/notifications/entities/notification.entity';
import { Task } from 'src/tasks/entities/task.entity';
import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true })
@Index(['username'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  @Index()
  email: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100 })
  @Exclude() // Ne pas retourner dans les réponses
  password: string;

  @Column({ length: 100, nullable: true })
  fullName: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'member', 'guest'],
    default: 'member',
  })
  role: 'admin' | 'manager' | 'member' | 'guest';

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'suspended'],
    default: 'active',
  })
  status: 'active' | 'inactive' | 'suspended';

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @OneToMany(() => Task, (task) => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => Task, (task) => task.assignedTo)
  assignedTasks: Task[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @OneToMany(() => Notifications, (notification) => notification.user)
  notifications: Notifications[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Méthodes utilitaires
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  canManageTasks(): boolean {
    return ['admin', 'manager'].includes(this.role);
  }
}
