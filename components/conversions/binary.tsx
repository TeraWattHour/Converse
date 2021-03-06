import React, { useContext, useEffect, useState } from "react";
import useLang from "../../hooks/useLang";
import useTranslation from "../../hooks/useTranslation";
import { TranslationContext } from "../../pages/_app";
import classes from "../../utils/classes";
import { FiHelpCircle } from "react-icons/fi";

export default function BinaryHelp() {
  const { language: l } = useLang();
  const c = useContext(TranslationContext);
  const { __ } = useTranslation(c, l);

  const [binary, setBinary] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [decimal, setDecimal] = useState(0);

  useEffect(() => {
    const string = binary.join("");
    const integer = parseInt(string, 2);
    setDecimal(integer);
  }, [binary]);

  return (
    <div className="border px-4 py-3 relative">
      <div className="absolute top-4 left-4">
        <FiHelpCircle className="text-6xl opacity-20" />
      </div>
      <div className="text-xl font-medium text-center mb-4">
        {__("System binarny - dziesiątkowy")}
      </div>
      <div className="max-w-[400px] w-full mx-auto">
        <p className="italic text-gray-600">
          {__(
            "Każda liczba całkowita ma swoją własną reprezentację binarną. Aby obliczyć tą wartość, musisz dodać poszczególne elementy ciągu binarnego."
          )}
        </p>
        <p
          className="italic text-gray-600"
          dangerouslySetInnerHTML={{
            __html: __(
              "Wartość elementu a<sub>n</sub> otrzymujemy poprzez wykonanie działania 2<sup>n</sup>&nbsp;*&nbsp;x, gdzie x jest 1 lub 0."
            ),
          }}
        ></p>
      </div>
      <p className="max-w-[400px] w-full mx-auto text-center my-4 block italic text-black text-lg">
        a<sub>n</sub> = 2<sup>n</sup> * x
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-10 mx-auto w-full">
            {binary.map((_, i) => (
              <div
                className={classes(
                  "mx-3 text-lg cursor-pointer font-semibold font-monospace",
                  binary.findIndex((x) => x == 1) == i && "text-indigo-600"
                )}
                onMouseEnter={() =>
                  setBinary((x) => x.map((y, j) => (i == j ? 1 : 0)))
                }
                key={i}
              >
                {binary.length - 1 - i}
              </div>
            ))}
            {binary.map((seg, i) => (
              <div
                className={classes(
                  "mx-3 text-2xl cursor-pointer font-semibold font-monospace",
                  binary.findIndex((x) => x == 1) == i && "text-indigo-600"
                )}
                onMouseEnter={() =>
                  setBinary((x) => x.map((y, j) => (i == j ? 1 : 0)))
                }
                key={i}
              >
                {seg}
              </div>
            ))}
          </div>
        </div>
        <div className=" font-monospace text-center flex items-center flex-col">
          <span className="text-2xl font-semibold">{decimal}</span>
          {binary.findIndex((x) => x == 1) !== -1 && (
            <span>
              2<sup>{binary.length - 1 - binary.findIndex((x) => x == 1)}</sup>{" "}
              * 1
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
