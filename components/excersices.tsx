import React, { useContext, useEffect, useState } from "react";
import { AiFillCloseSquare, AiOutlineCheck } from "react-icons/ai";
import useLang from "../hooks/useLang";
import useTranslation from "../hooks/useTranslation";
import { TranslationContext } from "../pages/_app";
import classes from "../utils/classes";

enum System {
  Binary = "2",
  Decimal = "10",
  Hexadecimal = "16",
  Octal = "8",
  Quaternary = "4",
}

enum Diffuculty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

type QuestionData = {
  value: string;
  answer: string;
  format: System;
  desired: System;
};

export default function Excercises() {
  const { language: l } = useLang();
  const c = useContext(TranslationContext);
  const { __ } = useTranslation(c, l);
  const [diffuculty, setDiffuculty] = useState<Diffuculty>(Diffuculty.Hard);
  const [question, setQuestion] = useState<QuestionData>();
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setResultsArray();
    setQuestion(() => setRandom());
  }, []);

  useEffect(() => {
    setAnswer("");
  }, [question]);

  const setRandom = (): QuestionData => {
    const systemsArray = Object.values(System);
    const systemsLen = systemsArray.length;

    const selectedSystem =
      systemsArray[Math.floor((systemsLen - 1) * Math.random())];
    const availableSystems = systemsArray.filter((x) => x !== selectedSystem);

    const desiredSystem =
      selectedSystem === System.Decimal
        ? availableSystems[
            Math.floor((availableSystems.length - 1) * Math.random())
          ]
        : System.Decimal;

    let random = Math.round(Math.random() * 30);
    switch (diffuculty) {
      case Diffuculty.Medium: {
        random *= Math.round(Math.random() * 100);
        break;
      }
      case Diffuculty.Hard: {
        random *= Math.round(Math.random() * 200);
        break;
      }
    }

    let value = "";
    switch (selectedSystem) {
      case System.Binary: {
        value = random.toString(2);
        break;
      }
      case System.Decimal: {
        value = random.toString();
        break;
      }
      case System.Hexadecimal: {
        value = random.toString(16);
        break;
      }
      case System.Octal: {
        value = random.toString(8);
        break;
      }
      case System.Quaternary: {
        value = random.toString(4);
        break;
      }
      default: {
        break;
      }
    }

    let answer = "";
    switch (desiredSystem) {
      case System.Binary: {
        answer = random.toString(2);
        break;
      }
      case System.Decimal: {
        answer = random.toString();
        break;
      }
      case System.Hexadecimal: {
        answer = random.toString(16);
        break;
      }
      case System.Octal: {
        answer = random.toString(8);
        break;
      }
      case System.Quaternary: {
        answer = random.toString(4);
        break;
      }
      default: {
        break;
      }
    }

    return {
      value,
      answer,
      format: selectedSystem,
      desired: desiredSystem,
    };
  };

  const setResultsArray = () => {
    let results = localStorage.getItem("converse__score");
    if (!results) {
      results = "";
    }
    // console.log(results);
    let resultsArray: string[];
    try {
      resultsArray = JSON.parse(results);
    } catch (error) {
      resultsArray = [];
    }
    // console.log(resultsArray);
    if (!Array.isArray(resultsArray)) {
      resultsArray = [];
      // console.log("hrer");
    }

    const corrupted = resultsArray.findIndex(
      (x) => x !== "correct" && x !== "incorrect"
    );
    if (corrupted !== -1) {
      resultsArray = [];
    }

    setResults(resultsArray);
  };

  const commitAnswer = () => {
    if (answer.toLocaleLowerCase() == question?.answer.toLocaleLowerCase()) {
      setResults((x) => [...x, "correct"]);
    } else {
      setResults((x) => [...x, "incorrect"]);
    }
    localStorage.setItem("converse__score", JSON.stringify(results));
    setQuestion(() => setRandom());
  };

  return (
    <div className="border px-4 py-3">
      <div className="text-xl font-medium text-center mb-1">
        {__("Ćwiczenia")}
      </div>
      <p className="max-w-[300px] w-full mx-auto italic text-center text-gray-600">
        {__("Zamień liczbę")}
      </p>
      {question && (
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center font-medium mt-4 select-none">
            <span>{question.value.toUpperCase()}</span>
            <sub>({question.format})</sub>
          </div>
          <div className="flex flex-row justify-center items-center mt-2 flex-wrap">
            <span className="mr-2">{__("Odpowiedź")}: </span>
            <span>
              <input
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitAnswer();
                  }
                }}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className={classes("w-[200px] outline-none border-b-2")}
              />
              <sub className="ml-1">({question.desired})</sub>
            </span>
          </div>
        </div>
      )}
      {results && (
        <div className="flex flex-row flex-wrap items-center justify-center mt-8">
          {results
            .reverse()
            .map((result, x) =>
              result == "correct" ? (
                <AiOutlineCheck key={x} className="text-3xl text-green-500" />
              ) : (
                <AiFillCloseSquare key={x} className="text-3xl text-red-600" />
              )
            )}
        </div>
      )}
    </div>
  );
}
