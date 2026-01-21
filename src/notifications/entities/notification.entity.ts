import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('notifications')
@Index(['userId', 'read'])
@Index(['userId', 'createdAt'])
export class Notifications {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: [
      'task_assigned',
      'task_updated',
      'comment_added',
      'mention',
      'system',
    ],
    default: 'task_updated',
  })
  type:
    | 'task_assigned'
    | 'task_updated'
    | 'comment_added'
    | 'mention'
    | 'system';

  @Column({ type: 'jsonb', nullable: true })
  data: Record<string, unknown>; // Données supplémentaires

  @Column({ default: false })
  read: boolean;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: string; // Pour les requêtes sans JOIN

  @CreateDateColumn()
  createdAt: Date;
}
