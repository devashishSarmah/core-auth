import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({
  name: 'user_login',
})
export class UserLogin {
  @PrimaryGeneratedColumn('uuid')
  session_id: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    nullable: false,
    type: 'int',
    default: '0',
  })
  login_time: number;

  @Column({
    type: 'varchar',
    length: '45',
    nullable: false,
  })
  ip_address: string;
}
