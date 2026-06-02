import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/en";
import { deepMerge } from "./merge-dictionary";

/** UI copy pack merged onto English for a locale */
export type LocalePack = Partial<Dictionary>;

export function buildLocaleDictionary(pack: LocalePack): Dictionary {
  return deepMerge(en, pack);
}
