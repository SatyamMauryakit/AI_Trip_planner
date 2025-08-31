import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check } from "lucide-react";

const TripDurationUi = ({ onSelectOption }: any) => {
  const [days, setDays] = useState(3); // Default to 3 days

  const incrementDays = () => {
    setDays((prev) => Math.min(prev + 1, 30)); // Max 30 days
  };

  const decrementDays = () => {
    setDays((prev) => Math.max(prev - 1, 1)); // Min 1 day
  };

  const handleConfirm = () => {
    onSelectOption(`${days} days`);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          How many days will your trip be?
        </h3>
        <p className="text-sm text-gray-600">
          Select the duration of your trip
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={decrementDays}
          disabled={days <= 1}
          className="w-10 h-10"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="text-2xl font-bold min-w-[60px] text-center">
          {days}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={incrementDays}
          disabled={days >= 30}
          className="w-10 h-10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-sm text-gray-500 text-center mb-4">
        {days === 1 ? "1 day" : `${days} days`}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleConfirm}
          className="bg-primary text-white hover:bg-primary/90"
        >
          <Check className="h-4 w-4 mr-2" />
          Confirm {days} {days === 1 ? "day" : "days"}
        </Button>
      </div>
    </div>
  );
};

export default TripDurationUi;
