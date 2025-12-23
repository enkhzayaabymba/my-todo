"use client";

import { useState } from "react";
import Tasks from "./Tasks";

export default function Todolist() {
  return (
    <div className="flex justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8 relative">
        <header className="flex mb-8 justify-center">
          <p className="text-purple-600 font-bold text-4xl">Todo</p>
          <p className="text-black font-bold text-4xl">List</p>
        </header>

        <div className="space-y-4 mb-6">
          <Tasks />
        </div>
      </div>
    </div>
  );
}
