import React, { useContext, useEffect, useState } from "react";
import useLang from "../../hooks/useLang";
import useTranslation from "../../hooks/useTranslation";
import { TranslationContext } from "../../pages/_app";
import classes from "../../utils/classes";
import { FiHelpCircle } from "react-icons/fi";

const NUMS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function OctalHelp() {
  const { language: l } = useLang();
  const c = useContext(TranslationContext);
  const { __ } = useTranslation(c, l);

  const [octal, setOctal] = useState(["0", 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [decimal, setDecimal] = useState(0);

  useEffect(() => {
    const string = octal.join("");
    const integer = parseInt(string, 8);
    setDecimal(integer);
  }, [octal]);

  return (
    <div className="border px-4 py-3 relative">
      <div className="absolute top-4 left-4">
        <FiHelpCircle className="text-6xl opacity-20" />
      </div>
      <div className="text-xl font-medium text-center mb-4">
        {__("System ósemkowy - dziesiątkowy")}
      </div>
      <div className="max-w-[400px] w-full mx-auto">
        <p className="italic text-gray-600">
          {__(
            "System ósemkowy działa analogicznie do systemu binarnego. Różnicą jest to, że zamiast 2 kombinacji (0, 1) jest ich 8 (0, 1, 2, 3, 4, 5, 6, 7)."
          )}
        </p>
      </div>
      <p className="max-w-[400px] w-full mx-auto text-center my-4 block italic text-black text-lg">
        a<sub>n</sub> = 8<sup>n</sup> * x
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="grid grid-cols-10 mx-auto w-full">
            {octal.map((_, i) => (
              <div
                className={classes(
                  "mx-3 text-lg cursor-pointer font-semibold font-monospace",
                  octal.findIndex((x) => x != 0) == i && "text-indigo-600"
                )}
                onMouseEnter={() => {
                  const random = Math.floor((NUMS.length - 1) * Math.random());
                  setOctal((x) => x.map((y, j) => (i == j ? NUMS[random] : 0)));
                }}
                key={i}
              >
                {octal.length - 1 - i}
              </div>
            ))}
            {octal.map((seg, i) => (
              <div
                className={classes(
                  "mx-3 text-2xl cursor-pointer font-semibold font-monospace",
                  octal.findIndex((x) => x != 0) == i && "text-indigo-600"
                )}
                onMouseEnter={() => {
                  const random = Math.floor((NUMS.length - 1) * Math.random());
                  setOctal((x) => x.map((y, j) => (i == j ? NUMS[random] : 0)));
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
          {octal.findIndex((x) => x != 0) != -1 && (
            <span>
              8<sup>{octal.length - 1 - octal.findIndex((x) => x != 0)}</sup>
              {" * "} {octal[octal.findIndex((x) => x != 0)] || 0}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
