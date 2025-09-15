import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Relation
} from "typeorm";
import { TeamMemberShip } from "./teamMembershipModel";

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => TeamMemberShip, (membership) => membership.team, {
    onDelete: "CASCADE",
  })
  teamMemberships?: Relation<TeamMemberShip[]>;
}
