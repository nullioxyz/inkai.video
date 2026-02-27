import { ApiLocale } from '@/lib/locale/resolve-api-locale';
import { resolveMediaUrl } from '@/utils/resolveMediaUrl';
import { apiRequest } from './client';

interface ApiCollectionResponse<T> {
  data: T[];
}

interface ApiResourceResponse<T> {
  data: T;
}

export interface InstitutionalContent {
  id: number;
  title: string | null;
  subtitle: string | null;
  short_description: string | null;
  description: string | null;
  slug: string;
  active: boolean;
  images: Array<{
    id: number;
    url: string;
    name: string;
  }>;
  created_at: string | null;
  updated_at: string | null;
}

export interface SeoContent {
  id: number;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  images: Array<{
    id: number;
    url: string;
    name: string;
  }>;
  active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

export interface SocialNetworkItem {
  id: number;
  url: string;
  slug: string;
  active: boolean;
}

export interface ContactCreatePayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactCreateResponse {
  id: number;
}

const withLanguageHeader = (locale: ApiLocale): HeadersInit => ({
  'Accept-Language': locale,
});

const normalizeMediaCollection = <T extends { images: Array<{ id: number; url: string; name: string }> }>(payload: T): T => {
  return {
    ...payload,
    images: payload.images.map((image) => ({
      ...image,
      url: resolveMediaUrl(image.url, { allowRelative: true }) ?? '',
    })),
  };
};

export const institutionalApi = {
  async list(locale: ApiLocale, token?: string | null): Promise<InstitutionalContent[]> {
    const response = await apiRequest<ApiCollectionResponse<InstitutionalContent>>('/api/institutional', {
      token,
      headers: withLanguageHeader(locale),
    });

    return response.data.map((entry) => normalizeMediaCollection(entry));
  },

  async show(slug: string, locale: ApiLocale, token?: string | null): Promise<InstitutionalContent> {
    const response = await apiRequest<ApiResourceResponse<InstitutionalContent>>(`/api/institutional/${slug}`, {
      token,
      headers: withLanguageHeader(locale),
    });

    return normalizeMediaCollection(response.data);
  },
};

export const seoApi = {
  async show(slug: string, locale: ApiLocale, token?: string | null): Promise<SeoContent> {
    const response = await apiRequest<ApiResourceResponse<SeoContent>>(`/api/seo/${slug}`, {
      token,
      headers: withLanguageHeader(locale),
    });

    return normalizeMediaCollection(response.data);
  },
};

export const socialApi = {
  async list(locale: ApiLocale, token?: string | null): Promise<SocialNetworkItem[]> {
    const response = await apiRequest<ApiCollectionResponse<SocialNetworkItem>>('/api/social-networks', {
      token,
      headers: withLanguageHeader(locale),
    });

    return response.data;
  },
};

export const contactsApi = {
  async create(payload: ContactCreatePayload, locale: ApiLocale, token?: string | null): Promise<ContactCreateResponse> {
    const response = await apiRequest<ApiResourceResponse<ContactCreateResponse>>('/api/contacts', {
      method: 'POST',
      token,
      headers: withLanguageHeader(locale),
      json: payload,
    });

    return response.data;
  },
};
