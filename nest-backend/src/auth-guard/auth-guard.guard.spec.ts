import { JWTAuthGuard } from './jwt-auth-guard.guard';

describe('AuthGuardGuard', () => {
  it('should be defined', () => {
    expect(new JWTAuthGuard()).toBeDefined();
  });
});
