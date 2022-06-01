import React, { useContext, useEffect, useState } from "react";
import useLang from "../../hooks/useLang";
import useTranslation from "../../hooks/useTranslation";
import { TranslationContext } from "../../pages/_app";
import classes from "../../utils/classes";
import { FiHelpCircle } from "react-icons/fi";

const HEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

export default function HexadecimalHelp() {
  const { language: l } = useLang();
  const c = useContext(TranslationContext);
  const { __ } = useTranslation(c, l);

  const [binary, setBinary] = useState(["0", 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [decimal, setDecimal] = useState(0);

  useEffect(() => {
    const string = binary.join("");
    const integer = parseInt(string, 16);
    setDecimal(integer);
  }, [binary]);

  return (
    <div className="border px-4 py-3 relative">
      <div className="absolute top-4 left-4">
        <FiHelpCircle className="text-6xl opacity-20" />
      </div>
      <div className="text-xl font-medium text-center mb-4">
        {__("System szesnastkowy - dziesiątkowy")}
      </div>
      <div className="max-w-[400px] w-full mx-auto">
        <p className="italic text-gray-600">
          {__(
            "System szesnastkowy to kolejny pozycyjny system liczbowy. System ten zajmuje bardzo ważne miejsce w informatyce. Oprócz liczb, wykorzystuje się w nim również wybrane litery."
          )}
        </p>
      </div>

      <p className="max-w-[400px] w-full mx-auto text-center my-4 block italic text-black text-lg">
        a<sub>n</sub> = 16<sup>n</sup> * x
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-10 mx-auto w-full">
            {binary.map((_, i) => (
              <div
                className={classes(
                  "mx-3 text-lg cursor-pointer font-semibold font-monospace",
                  binary.findIndex((x) => x != 0) == i && "text-indigo-600"
                )}
                onMouseEnter={() => {
                  const random = Math.floor((HEX.length - 1) * Math.random());
                  setBinary((x) => x.map((y, j) => (i == j ? HEX[random] : 0)));
                }}
                key={i}
              >
                {binary.length - 1 - i}
              </div>
            ))}
            {binary.map((seg, i) => (
              <div
                className={classes(
                  "mx-3 text-2xl cursor-pointer font-semibold font-monospace",
                  binary.findIndex((x) => x != 0) == i && "text-indigo-600"
                )}
                onMouseEnter={() => {
                  const random = Math.floor((HEX.length - 1) * Math.random());
                  setBinary((x) => x.map((y, j) => (i == j ? HEX[random] : 0)));
                }}
                key={i}
              >
                {seg}
              </div>
            ))}
          </div>
        </div>
        <div className=" font-monospace text-center flex items-center flex-col">
          <span className="text-2xl font-semibold">{decimal}</span>
          {binary.findIndex((x) => x != 0) !== -1 && (
            <span>
              16<sup>{binary.length - 1 - binary.findIndex((x) => x != 0)}</sup>
              {" * "} {binary[binary.findIndex((x) => x != 0)]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
