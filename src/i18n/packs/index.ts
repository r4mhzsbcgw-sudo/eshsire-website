import type { Locale } from "../locales";
import type { LocalePack } from "../build-locale-dict";
import { arPack } from "./mideast";
import { dePack, frPack, itPack, ptPack, ruPack } from "./europe";
import { idPack, jaPack, koPack, thPack, viPack } from "./asia";
import { hePack, trPack } from "./mideast";

export const localePacks: Partial<Record<Locale, LocalePack>> = {
  ar: arPack,
  de: dePack,
  fr: frPack,
  it: itPack,
  pt: ptPack,
  ru: ruPack,
  tr: trPack,
  th: thPack,
  vi: viPack,
  ja: jaPack,
  ko: koPack,
  id: idPack,
  he: hePack,
};
