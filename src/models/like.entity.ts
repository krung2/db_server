import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('like')
export default class Like {

  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    name: 'user_id',
  })
  userId!: string;

  @CreateDateColumn({
    name: 'created_at'
  })
  createdAt!: Date;
}