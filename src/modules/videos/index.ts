import { createHttpVideosGateway } from './infra/http-videos-gateway';
import { createEchoVideosRealtimeGateway } from './realtime/echo-videos-realtime-gateway';

export const createVideosModule = () => {
  return {
    gateway: createHttpVideosGateway(),
    realtime: createEchoVideosRealtimeGateway(),
  };
};
