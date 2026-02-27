import { createAuthModule } from '@/modules/auth';
import { createPresetsModule } from '@/modules/presets';
import { createVideosModule } from '@/modules/videos';

const authModule = createAuthModule();
const presetsModule = createPresetsModule();
const videosModule = createVideosModule();

export const dashboardDependencies = {
  authGateway: authModule.gateway,
  presetsGateway: presetsModule.gateway,
  videosGateway: videosModule.gateway,
  videosRealtime: videosModule.realtime,
};
