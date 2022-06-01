import { useEffect, useState } from "react";

export enum Languages {
  pl = "pl",
  ukr = "ukr",
}

export default function useLang() {
  const [language, setL] = useState<Languages>(Languages.pl);

  useEffect(() => {
    const selected = localStorage.getItem("converter__lang");

    const good =
      selected && Object.values(Languages).includes(selected as Languages);

    if (good) {
      setL(selected as Languages);
    } else {
      setLanguage(Languages.pl);
    }
  }, []);

  function setLanguage(lang: Languages) {
    localStorage.setItem("converter__lang", lang);
    setL(lang);
    window.location.reload();
  }

  return { language, setLanguage };
}
