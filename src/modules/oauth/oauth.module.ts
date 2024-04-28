import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { join } from 'path';

@Module({
  imports: [
    JwtModule.register({
      privateKey: readFileSync(join(__dirname, '../../../private.key')),
      publicKey: readFileSync(join(__dirname, '../../../public.key')),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '60s',
      },
      verifyOptions: {
        algorithms: ['RS256'],
      },
    }),
  ],
  controllers: [OauthController],
  providers: [OauthService],
})
export class OauthModule {}
