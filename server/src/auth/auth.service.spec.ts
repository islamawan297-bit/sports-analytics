import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthService Unit Tests', () => {
  let service: AuthService;
  let prismaMock: any;
  let jwtMock: any;

  beforeEach(async () => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };

    jwtMock = {
      sign: jest.fn().mockReturnValue('mock_jwt_token_sample'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a new user with hashed password', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({
      id: 'usr-new-1',
      email: 'newuser@statsedge.pro',
      name: 'New User',
      role: 'USER',
      favorites: '[]',
    });

    const result = await service.register({
      email: 'newuser@statsedge.pro',
      password: 'UserPass123!',
      name: 'New User',
    });

    expect(result.accessToken).toBe('mock_jwt_token_sample');
    expect(result.user.email).toBe('newuser@statsedge.pro');
    expect(prismaMock.user.create).toHaveBeenCalled();
  });

  it('should validate user password during login', async () => {
    const hashedPassword = await bcrypt.hash('UserPass123!', 10);
    prismaMock.user.findUnique.mockResolvedValue({
      id: 'usr-1',
      email: 'user@statsedge.pro',
      password: hashedPassword,
      name: 'Alex Rivera',
      role: 'USER',
      favorites: '[]',
    });

    const result = await service.login({
      email: 'user@statsedge.pro',
      password: 'UserPass123!',
    });

    expect(result.accessToken).toBe('mock_jwt_token_sample');
    expect(result.user.name).toBe('Alex Rivera');
  });
});
