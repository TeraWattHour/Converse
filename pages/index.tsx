import Head from "next/head";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Navbar from "../components/navbar";
import useLang from "../hooks/useLang";
import styles from "../styles/Home.module.css";
import classes from "../utils/classes";
import { FiHelpCircle } from "react-icons/fi";
import Footer from "../components/footer";
import __ from "../utils/getTranslation";
import { TranslationContext } from "./_app";
import useTranslation from "../hooks/useTranslation";
import BinaryHelp from "../components/conversions/binary";
import HexadecimalHelp from "../components/conversions/hexadecimal";
import OctalHelp from "../components/conversions/octal";
import QuaternaryHelp from "../components/conversions/quaternary";
import Excercises from "../components/excersices";

const HELP = [BinaryHelp, HexadecimalHelp, OctalHelp, QuaternaryHelp];
export default function Home() {
  const { language: l } = useLang();
  const c = useContext(TranslationContext);
  const { __ } = useTranslation(c, l);
  const [values, setValues] = useState({
    decimal: 0,
    binary: "0",
    hexadecimal: "0",
    quaternary: "0",
    octal: "0",
  });
  const [help, setHelp] = useState(0);

  const setDecimal = (number: string) => {
    const integer = parseInt(number);

    setValues({
      decimal: integer,
      binary: integer.toString(2),
      hexadecimal:
        integer.toString(16) == "NaN" ? "" : integer.toString(16).toUpperCase(),
      octal:
        integer.toString(8) == "NaN" ? "" : integer.toString(8).toUpperCase(),
      quaternary:
        integer.toString(4) == "NaN" ? "" : integer.toString(4).toUpperCase(),
    });
  };

  return (
    <div className="h-full flex flex-col">
      <Head>
        <title>Converse. - simple number system generator</title>
        <link rel="icon" href="/ico.jpg" />
      </Head>
      <Navbar />
      <div className="max-w-5xl mx-auto flex-grow w-full px-4 mt-12">
        <div className="text-center text-2xl font-medium mb-4">
          {__("System dziesiątkowy")}
        </div>
        <input
          type="number"
          min={0}
          step={1}
          value={values.decimal}
          onChange={(e) => setDecimal(e.target.value)}
          placeholder={__(
            "Wprowadź liczbę w systemie dziesiętnym do zamiany",
            "string"
          )}
          className="border-b-4 w-full outline-none transition-all focus:border-black text-xl md:text-3xl py-1.5 md:py-3"
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2 mt-8">
          <div className={classes("border _rounded-lg px-3 py-2")}>
            <div className="text-lg font-medium text-center flex flex-row items-center justify-center">
              <span className="mr-2">{__("System binarny")}</span>{" "}
              <FiHelpCircle
                className="cursor-pointer"
                onClick={() => setHelp((x) => (x == 0 ? -1 : 0))}
              />
            </div>
            <input
              value={values.binary}
              onChange={(e) => {
                const integer = parseInt(e.target.value, 2);
                setDecimal(integer.toString());
              }}
              type="number"
              className="outline-none w-full border-b-2 py-1 focus:border-black transition-all"
            />
          </div>
          <div className={classes("border _rounded-lg px-3 py-2")}>
            <div className="text-lg font-medium text-center flex flex-row items-center justify-center">
              <span className="mr-2">{__("System szesnastkowy")}</span>{" "}
              <FiHelpCircle
                className="cursor-pointer"
                onClick={() => setHelp((x) => (x == 1 ? -1 : 1))}
              />
            </div>
            <input
              type="text"
              value={values.hexadecimal}
              onChange={(e) => {
                const integer = parseInt(e.target.value, 16);
                setDecimal(integer.toString());
              }}
              className="outline-none w-full border-b-2  py-1 focus:border-black transition-all"
            />
          </div>
          <div className={classes("border _rounded-lg px-3 py-2")}>
            <div className="text-lg font-medium text-center flex flex-row items-center justify-center">
              <span className="mr-2">{__("System ósemkowy")}</span>{" "}
              <FiHelpCircle
                className="cursor-pointer"
                onClick={() => setHelp((x) => (x == 2 ? -1 : 2))}
              />
            </div>
            <input
              type="text"
              value={values.octal}
              onChange={(e) => {
                const integer = parseInt(e.target.value, 8);
                setDecimal(integer.toString());
              }}
              className="outline-none w-full border-b-2 py-1  focus:border-black transition-all"
            />
          </div>
          <div className={classes("border _rounded-lg px-3 py-2")}>
            <div className="text-lg font-medium text-center flex flex-row items-center justify-center">
              <span className="mr-2">{__("System czwórkowy")}</span>{" "}
              <FiHelpCircle
                className="cursor-pointer"
                onClick={() => setHelp((x) => (x == 3 ? -1 : 3))}
              />
            </div>
            <input
              type="text"
              value={values.quaternary}
              onChange={(e) => {
                const integer = parseInt(e.target.value, 4);
                setDecimal(integer.toString());
              }}
              className="outline-none w-full border-b-2 py-1  focus:border-black transition-all"
            />
          </div>
        </div>
        <div className="mt-10">
          {help != -1 && React.createElement(HELP[help])}
        </div>
        <div className="mt-10">
          <Excercises />
        </div>
      </div>
      <Footer />
    </div>
  );
}
