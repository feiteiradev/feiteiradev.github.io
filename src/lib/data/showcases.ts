export type ShowcaseSlug = 'meridian-goods' | 'linha-viva-listings' | 'sereno-spa';

export interface ShowcaseMeta {
  slug: ShowcaseSlug;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export const SHOWCASES: ShowcaseMeta[] = [
  { slug: 'meridian-goods', themeColor: '#eab308', gradientFrom: '#facc15', gradientTo: '#f97316' },
  { slug: 'linha-viva-listings', themeColor: '#3b82f6', gradientFrom: '#3b82f6', gradientTo: '#06b6d4' },
  { slug: 'sereno-spa', themeColor: '#8b5cf6', gradientFrom: '#8b5cf6', gradientTo: '#9333ea' }
];