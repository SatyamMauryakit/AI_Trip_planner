import React from "react";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Stay conscious of costs",
    icon: "💸",
    color: "bg-green-100 text-green-600 border-green-200",
    hoverColor: "hover:bg-green-50 hover:border-green-300",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    hoverColor: "hover:bg-yellow-50 hover:border-yellow-300",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don't worry about cost",
    icon: "💎",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    hoverColor: "hover:bg-purple-50 hover:border-purple-300",
  },
];

const BudgetUi = ({ onSelectOption }: any) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="text-center mb-4">
        <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          What's your budget preference?
        </h3>
        <p className="text-sm text-gray-600">
          Choose the option that best fits your travel budget
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SelectBudgetOptions.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${option.color} ${option.hoverColor} hover:shadow-md`}
            onClick={() => onSelectOption(option.title + " - " + option.desc)}
          >
            <div className="text-3xl mb-3">{option.icon}</div>
            <h4 className="font-semibold text-center mb-2">{option.title}</h4>
            <p className="text-xs text-center opacity-80">{option.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetUi;
