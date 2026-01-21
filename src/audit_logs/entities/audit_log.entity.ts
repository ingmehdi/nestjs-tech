import { Entity, Index, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('audit_logs')
@Index(['entityId', 'entityType'])
@Index(['userId', 'createdAt'])
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  action: string; // CREATE, UPDATE, DELETE, etc.

  @Column({ length: 50 })
  entityType: string; // 'Task', 'User', etc.

  @Column()
  entityId: string;

  @Column({ type: 'jsonb', nullable: true })
  oldData: Record<string, unknown>;

  @Column({ type: 'jsonb', nullable: true })
  newData: Record<string, unknown>;

  @Column()
  userId: string;

  @Column({ length: 100 })
  userEmail: string;

  @Column({ length: 45, nullable: true })
  ipAddress: string;

  @Column({ length: 500, nullable: true })
  userAgent: string;

  @CreateDateColumn()
  createdAt: Date;
}