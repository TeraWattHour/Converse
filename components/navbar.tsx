import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineFieldNumber } from "react-icons/ai";
import useLang, { Languages } from "../hooks/useLang";
import classes from "../utils/classes";

const langs = [
  { name: "Język polski", icon: "/pol.png", action: Languages.pl },
  { name: "Українська мова", icon: "/ukr.webp", action: Languages.ukr },
];

function Navbar() {
  const { language, setLanguage } = useLang();

  return (
    <div className="border-b">
      <div className="relative w-full mx-auto w-full max-w-5xl py-2 px-4 flex flex-row items-center justify-between">
        <div>
          <Link href="/">
            <a>
              <AiOutlineFieldNumber className="text-4xl" />
            </a>
          </Link>
        </div>
        <div>
          <div className="flex flex-row space-x-2">
            {langs.map((lan, x) => (
              <div
                className={classes(
                  "cursor-pointer relative w-[32px] h-[20px] hover:rounded-md overflow-hidden transition-all duration-500",
                  lan.action == language && "ring-2 ring-black"
                )}
                onClick={() => setLanguage(lan.action)}
              >
                <Image src={lan.icon} layout="fill" alt={lan.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
