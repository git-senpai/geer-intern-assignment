"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-600 animate-spin"></div>
        <div
          className="absolute top-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-300 animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>
    </div>
  );
}
