import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  getClient(client_id: string, client_secret?: string) {
    if (client_secret == null) {
      return this.clientRepository.findOneOrFail({ where: { client_id } });
    }
    return this.clientRepository.findOneOrFail({
      where: {
        client_id,
        client_secret,
      },
    });
  }

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.save(createClientDto);
  }
}
