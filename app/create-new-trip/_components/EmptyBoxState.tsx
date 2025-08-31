import { suggestions } from "@/app/_components/Hero";
import React from "react";

const EmptyBoxState = ({ onSelectOption }: any) => {
  return (
    <div className="mt-7">
      <h1 className="text-3xl font-bold text-center">
        Start Planning Your <strong className="text-primary">Dream Trip</strong>{" "}
        Using AI
      </h1>
      <p className="text-center text-gray-500 mt-2">
        Tell me what you want to do and I will plan the perfect trip for you:
        Flight, Hotels, Activities{" "}
      </p>

      <div className="mt-7 flex flex-col gap-2">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => {
              onSelectOption(suggestion.title);
            }}
            className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer hover:border-primary hover:text-primary duration-200 "
          >
            {suggestion.icon}
            <h2 className="text-lg">{suggestion.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmptyBoxState;
