import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({
  name: 'user_ai',
})
export class UserAI {
  @PrimaryGeneratedColumn()
  ai_user_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  personality_type: string;

  @Column()
  activity_pattern: string;

  @Column({ nullable: true })
  language_preference: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  content_preferences: string;
}
