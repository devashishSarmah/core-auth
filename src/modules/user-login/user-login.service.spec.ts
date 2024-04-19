import { Test, TestingModule } from '@nestjs/testing';
import { UserLoginService } from './user-login.service';

describe('UserLoginService', () => {
  let service: UserLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: UserLoginService, useValue: {} }],
    }).compile();

    service = module.get<UserLoginService>(UserLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
