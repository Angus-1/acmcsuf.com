import ARTWORK_JSON from './artwork.json';
import TIERS_JSON from './tiers.json';


export interface AcmArtwork {
  title: string;
  src: string;
}

export const ARTWORK: AcmArtwork[] = [...ARTWORK_JSON];

export const TIERS: string[] = [...TIERS_JSON];
