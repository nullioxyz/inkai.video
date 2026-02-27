import { STATUS_DOT } from '../types';
import type { VideoJobItem } from '@/types/dashboard';

interface SidebarVideoBulletProps {
  status: VideoJobItem['status'];
}

const SidebarVideoBullet = ({ status }: SidebarVideoBulletProps) => {
  return <span className={`mx-auto mt-1 inline-block h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />;
};

export default SidebarVideoBullet;
