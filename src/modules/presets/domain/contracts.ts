import { BackendModel, BackendPreset, BackendPresetFiltersResponse } from '@/lib/api/dashboard';

export interface PresetsQueryFilters {
  aspectRatio?: string;
  tag?: string;
  tags?: string[];
}

export interface PresetsGateway {
  listModels(token: string): Promise<BackendModel[]>;
  listPresets(token: string, modelId: number, filters?: PresetsQueryFilters): Promise<BackendPreset[]>;
  listPresetFilters(token: string, modelId: number): Promise<BackendPresetFiltersResponse>;
}
