import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  attachments: Array<{
    url: string;
    type: string;
    name: string;
    size: number;
  }>;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Task, (task) => task.comments)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => Comments, (comment) => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Comments;

  @OneToMany(() => Comments, (comment) => comment.parent)
  replies: Comments[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
