import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userModel";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  // many tasks can only have one user
  @ManyToOne("User", "tasks", {
    onDelete: "CASCADE",
  })

  // name the fk
  @JoinColumn({ name: "user_id" })
  user?: User;

  // declare the fk
  @Column({ type: "uuid", nullable: true })
  user_id?: string;
}
