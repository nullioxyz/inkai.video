import { SeoContent } from '@/lib/api/public-content';
import type { Metadata } from 'next';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, defaultMetadata } from '@/utils/generateMetaData';

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
  const fallbackTitle = options.fallbackTitle ?? (typeof defaultMetadata.title === 'string' ? defaultMetadata.title : DEFAULT_TITLE);
  const fallbackDescription =
    options.fallbackDescription ?? (typeof defaultMetadata.description === 'string' ? defaultMetadata.description : DEFAULT_DESCRIPTION);

  if (!seo) {
    return {
      ...defaultMetadata,
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const title = seo.meta_title || fallbackTitle;
  const description = seo.meta_description || fallbackDescription;
  const openGraphTitle = seo.og_title || title;
  const openGraphDescription = seo.og_description || description;
  const twitterTitle = seo.twitter_title || title;
  const twitterDescription = seo.twitter_description || description;

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
      title: openGraphTitle,
      description: openGraphDescription,
      url: seo.canonical_url || defaultMetadata.openGraph?.url,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: twitterTitle,
      description: twitterDescription,
    },
  };
};
