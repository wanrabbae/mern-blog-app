import React from "react";
import { Hero, Posts } from "../../components/";
//  THEME COLOR #1D4ED8
export default function MainPage() {
  return (
    <div className="px-7 py-7 md:px-16 md:py-7 mb-auto dark:bg-gray-800">
      <Hero />
      <Posts />
    </div>
  );
}
