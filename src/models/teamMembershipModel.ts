import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

import { User } from "./userModel";
import { Role } from "./roleModel";
import { Team } from "./teamModel";

@Entity()
export class TeamMemberShip {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  @ManyToOne(() => User, (user) => user.teamMemberships, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @ManyToOne(() => Role, (role) => role.teamMemberships, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id" })
  role?: Role;

  @ManyToOne(() => Team, (team) => team.teamMemberships, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "team_id" })
  team?: Team;
}