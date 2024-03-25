import { DataSource } from 'typeorm';
import configService from 'src/config/config.service';

export default new DataSource(<any>configService.getTypeOrmConfig());
