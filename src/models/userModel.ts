import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Task } from './taskModel';
import { TeamMemberShip } from './teamMembershipModel';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  user_name!: string;

  @Column({ type: 'varchar', nullable: false })
  first_name!: string;

  @Column({ type: 'varchar', nullable: false })
  last_name!: string;

  @Column({ type: 'varchar', nullable: false })
  email!: string;

  @Column({ type: 'varchar', nullable: false })
  password!: string;

  @Column({ type: 'boolean' })
  is_verified?: string;

  @Column({ type: 'boolean' })
  is_active?: string;

  @Column({ type: 'boolean' })
  is_staff?: string;

  @CreateDateColumn()
  date_joined?: string;

  @Column({ type: 'timestamp', nullable: true })
  lastLogin?: Date;

  // one user can belong to several tasks. Task is in relation with user
  @OneToMany('Task', 'user', {
    // if user is delete, all task belonging to the user is deleted too
    onDelete: 'CASCADE',
  })
  // tasks is an array of Task
  tasks?: Relation<Task[]>;
  @OneToMany(() => TeamMemberShip, (membership) => membership.user, {
    onDelete: 'CASCADE',
  })
  teamMemberships?: Relation<TeamMemberShip[]>;
}
