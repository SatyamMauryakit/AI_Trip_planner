import React from "react";
import { Users } from "lucide-react";

export const SelectTravelersList = [
  {
    id: 1,
    title: "Solo Traveler",
    desc: "A solo traveler in exploration",
    icon: "✈️",
    people: "1 Person",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    hoverColor: "hover:bg-blue-50 hover:border-blue-300",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
    color: "bg-pink-100 text-pink-600 border-pink-200",
    hoverColor: "hover:bg-pink-50 hover:border-pink-300",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: "🏡",
    people: "3 to 5 People",
    color: "bg-green-100 text-green-600 border-green-200",
    hoverColor: "hover:bg-green-50 hover:border-green-300",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "😎",
    people: "5 to 10 People",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    hoverColor: "hover:bg-purple-50 hover:border-purple-300",
  },
];

const GroupSizeUi = ({ onSelectOption }: any) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
      <div className="text-center mb-4">
        <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          How many travelers?
        </h3>
        <p className="text-sm text-gray-600">
          Select the group size for your trip
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {SelectTravelersList.map((option, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${option.color} ${option.hoverColor} hover:shadow-md`}
            onClick={() => onSelectOption(option.title + " - " + option.people)}
          >
            <div className="text-3xl mb-3">{option.icon}</div>
            <h4 className="font-semibold text-center mb-1">{option.title}</h4>
            <p className="text-xs text-center opacity-80 mb-2">{option.desc}</p>
            <span className="text-xs font-medium bg-white/50 px-2 py-1 rounded-full">
              {option.people}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSizeUi;
