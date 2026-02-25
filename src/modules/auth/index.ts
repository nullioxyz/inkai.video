import { createHttpAuthGateway } from './infra/http-auth-gateway';

export const createAuthModule = () => {
  return {
    gateway: createHttpAuthGateway(),
  };
};
