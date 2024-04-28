import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Grant } from '../models/client.model';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  client_id: string;

  @Column({ type: 'text', select: false })
  client_secret: string;

  @Column('simple-array')
  redirect_uris: string[];

  @Column('simple-array')
  grants: Grant[];
}
