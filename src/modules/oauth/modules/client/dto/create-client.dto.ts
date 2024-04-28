import { IsEnum, IsNotEmpty, IsUrl, IsUUID, MinLength } from 'class-validator';
import { Grant } from '../models/client.model';

export class CreateClientDto {
  @IsNotEmpty()
  @IsUUID()
  client_id: string;

  @IsNotEmpty()
  @MinLength(8)
  client_secret: string;

  @IsUrl({ protocols: ['https'] }, { each: true })
  @IsNotEmpty()
  redirect_uris: string[];

  @IsNotEmpty()
  @IsEnum(Grant, { each: true })
  grants: Grant[];
}
