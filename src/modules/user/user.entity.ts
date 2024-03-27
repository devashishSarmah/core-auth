import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  username: string;

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  password_hash: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 100,
  })
  full_name: string;

  @Column({
    type: 'text',
  })
  bio: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  profile_picture_url: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  website: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
