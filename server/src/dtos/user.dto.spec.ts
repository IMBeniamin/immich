import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAdminDto, CreateUserOAuthDto, UpdateUserDto, UserAdminCreateDto } from 'src/dtos/user.dto';

describe('update user DTO', () => {
  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(UpdateUserDto, {
      email: someEmail,
      id: '3fe388e4-2078-44d7-b36c-39d9dee3a657',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});

describe('create user DTO', () => {
  it('validates the email', async () => {
    const params: Partial<UserAdminCreateDto> = {
      email: undefined,
      password: 'password',
      name: 'name',
    };
    let dto: UserAdminCreateDto = plainToInstance(UserAdminCreateDto, params);
    let errors = await validate(dto);
    expect(errors).toHaveLength(1);

    params.email = 'invalid email';
    dto = plainToInstance(UserAdminCreateDto, params);
    errors = await validate(dto);
    expect(errors).toHaveLength(1);

    params.email = 'valid@email.com';
    dto = plainToInstance(UserAdminCreateDto, params);
    errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(UserAdminCreateDto, {
      email: someEmail,
      password: 'some password',
      name: 'some name',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});

describe('create admin DTO', () => {
  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(CreateAdminDto, {
      isAdmin: true,
      email: someEmail,
      password: 'some password',
      name: 'some name',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});

describe('create user oauth DTO', () => {
  it('should allow emails without a tld', async () => {
    const someEmail = 'test@test';

    const dto = plainToInstance(CreateUserOAuthDto, {
      email: someEmail,
      oauthId: 'some oauth id',
      name: 'some name',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
    expect(dto.email).toEqual(someEmail);
  });
});
