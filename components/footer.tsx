import React from "react";

export default function Footer() {
  return (
    <footer className="border-t flex items-center justify-center mt-20 py-10 bg-gray-50">
      <span className="mr-1">Made by </span>
      <a
        href="https://terawatthour.dev"
        target={"_blank"}
        rel="noreferrer"
        className="font-medium"
      >
        TeraWattHour
      </a>
    </footer>
  );
}
