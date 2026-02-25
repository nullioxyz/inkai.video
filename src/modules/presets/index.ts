import { createHttpPresetsGateway } from './infra/http-presets-gateway';

export const createPresetsModule = () => {
  return {
    gateway: createHttpPresetsGateway(),
  };
};
