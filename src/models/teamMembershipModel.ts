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

  // USER
  @ManyToOne("User", "teammembership", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user?: User;

  // declare the fk
  @Column({ type: "uuid", nullable: true })
  user_id?: string;

  // ROLE
  @ManyToOne("Role", "teammembership", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id" })
  role?: Role;

  @Column({ type: "uuid", nullable: true })
  role_id?: string;

  // TEAM
  @ManyToOne("Role", "teammembership", {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "role_id" })
  team?: Team;

  @Column({ type: "uuid", nullable: true })
  team_id?: string;
}