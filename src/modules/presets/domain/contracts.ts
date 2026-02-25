import { BackendPreset, BackendPresetFiltersResponse } from '@/lib/api/dashboard';

export interface PresetsQueryFilters {
  aspectRatio?: string;
  tag?: string;
  tags?: string[];
}

export interface PresetsGateway {
  listPresets(token: string, filters?: PresetsQueryFilters): Promise<BackendPreset[]>;
  listPresetFilters(token: string): Promise<Array<{ modelId: number; filters: BackendPresetFiltersResponse }>>;
}
