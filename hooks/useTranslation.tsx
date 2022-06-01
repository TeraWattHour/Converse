import React from "react";
import { Languages } from "./useLang";

export default function useTranslation(c: object, lang: Languages) {
  const [translations, setTranslations] = React.useState<object>(c[lang]);

  React.useEffect(() => {
    setTranslations(c[lang]);
  }, [lang]);

  function __(key: string, type?: string) {
    if (type == "string") {
      return translations?.[key] || key;
    }
    return (
      <div
        dangerouslySetInnerHTML={{ __html: translations?.[key] || key }}
      ></div>
    );
  }

  return { __ };
}
