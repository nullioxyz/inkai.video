import { SeoContent } from '@/lib/api/public-content';
import type { Metadata } from 'next';
import { defaultMetadata } from '@/utils/generateMetaData';

interface BuildSeoMetadataOptions {
  fallbackTitle?: string;
  fallbackDescription?: string;
}

const splitKeywords = (keywords: string | null): string[] | undefined => {
  if (!keywords || keywords.trim() === '') {
    return undefined;
  }

  return keywords
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
};

export const buildSeoMetadata = (seo: SeoContent | null, options: BuildSeoMetadataOptions = {}): Metadata => {
  if (!seo) {
    return {
      ...defaultMetadata,
      title: options.fallbackTitle ?? defaultMetadata.title,
      description: options.fallbackDescription ?? defaultMetadata.description,
    };
  }

  const title = seo.meta_title || options.fallbackTitle || defaultMetadata.title;
  const description = seo.meta_description || options.fallbackDescription || defaultMetadata.description;

  return {
    ...defaultMetadata,
    title,
    description,
    keywords: splitKeywords(seo.meta_keywords),
    alternates: {
      canonical: seo.canonical_url || undefined,
    },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: seo.og_title || title,
      description: seo.og_description || description,
      url: seo.canonical_url || defaultMetadata.openGraph?.url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: seo.twitter_title || title,
      description: seo.twitter_description || description,
    },
  };
};
