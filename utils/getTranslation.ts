import { Languages } from "../hooks/useLang";

export default function __(c: object, lang: Languages, key: string) {
  return c[lang]?.[key] || key;
}
