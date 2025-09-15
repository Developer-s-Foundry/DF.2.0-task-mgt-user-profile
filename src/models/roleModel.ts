import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { TeamMemberShip } from "./teamMembershipModel";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text" })
  description?: string;

  @OneToMany(() => TeamMemberShip, (membership) => membership.role, {
    onDelete: "CASCADE",
  })
  teamMemberships?: Relation<TeamMemberShip[]>;
}
