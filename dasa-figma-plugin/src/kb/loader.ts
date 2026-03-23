import type { KBData } from './types';
import { BUNDLED_KB } from './bundled';

const STORAGE_KEY = 'dasa-kb-cache';

function isValidKB(data: unknown): data is KBData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.version === 'string' &&
    Array.isArray(d.rules) &&
    d.tokens != null && typeof d.tokens === 'object' &&
    d.copy != null && typeof d.copy === 'object' &&
    Array.isArray(d.checklist) &&
    d.uxPatterns != null && typeof d.uxPatterns === 'object'
  );
}

/**
 * Default URL for remote KB. Points to kb.json in this repo's main branch.
 * Format: https://raw.githubusercontent.com/org/repo/branch/kb.json
 */
export const DEFAULT_KB_REMOTE_URL = 'https://raw.githubusercontent.com/dasa-design/dasa-figma-plugin/main/kb.json';

export interface LoadKBOptions {
  remoteUrl?: string;
  skipCache?: boolean;
  skipRemote?: boolean;
}

/**
 * Loads KB: tries remote fetch, then clientStorage cache, then bundled fallback.
 */
export async function loadKB(options: LoadKBOptions = {}): Promise<KBData> {
  const { remoteUrl = DEFAULT_KB_REMOTE_URL, skipCache = false, skipRemote = false } = options;

  if (!skipRemote) {
    try {
      const res = await fetch(remoteUrl);
      if (res.ok) {
        const data = await res.json() as unknown;
        if (isValidKB(data)) {
          if (!skipCache) {
            await figma.clientStorage.setAsync(STORAGE_KEY, JSON.stringify(data));
          }
          return data;
        }
      }
    } catch {
      // Fall through to cache or bundled
    }
  }

  if (!skipCache) {
    try {
      const cached = await figma.clientStorage.getAsync(STORAGE_KEY);
      if (cached) {
        try {
          const data = JSON.parse(cached) as unknown;
          if (isValidKB(data)) return data;
        } catch {
          await figma.clientStorage.deleteAsync(STORAGE_KEY);
        }
      }
    } catch {
      // Fall through to bundled
    }
  }

  return BUNDLED_KB;
}
