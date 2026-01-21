import { Task } from "src/tasks/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn } from "typeorm";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 7 }) // #RRGGBB
  color: string;

  @ManyToMany(() => Task, task => task.tags)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;
}