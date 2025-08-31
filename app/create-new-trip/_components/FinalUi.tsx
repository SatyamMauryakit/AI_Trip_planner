import React from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  DollarSign,
  Calendar,

  Eye,
 
} from "lucide-react";

const FinalUi = ({ tripPlan, messages }: any) => {
  // Extract trip details from conversation
  const extractTripDetails = () => {
    const details: any = {};

    messages.forEach((msg: any) => {
      if (msg.role === "user") {
        const content = msg.content.toLowerCase();

        // Extract destination
        if (content.includes("to") || content.includes("destination")) {
          details.destination = msg.content;
        }

        // Extract group size
        if (
          content.includes("solo") ||
          content.includes("couple") ||
          content.includes("family") ||
          content.includes("friends")
        ) {
          details.groupSize = msg.content;
        }

        // Extract budget
        if (
          content.includes("budget") ||
          content.includes("cheap") ||
          content.includes("moderate") ||
          content.includes("luxury")
        ) {
          details.budget = msg.content;
        }

        // Extract duration
        if (content.includes("days") || content.includes("day")) {
          details.duration = msg.content;
        }

        // Extract interests
        if (
          content.includes("adventure") ||
          content.includes("sightseeing") ||
          content.includes("cultural") ||
          content.includes("food") ||
          content.includes("nightlife") ||
          content.includes("relaxation")
        ) {
          details.interests = msg.content;
        }
      }
    });

    return details;
  };

  const tripDetails = extractTripDetails();

  
  

  

  return (
    <div className="mt-4 p-6 border rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎉</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Planning Your Dream Trip...
        </h3>
        <p className="text-gray-600">
          Here's your personalized travel itinerary
        </p>
      </div>

      {/* Trip Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {tripDetails.destination && (
          <div className="bg-blue-100 text-blue-600 border-blue-200 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">

  <MapPin className="h-5 w-5 text-blue-500" />

             <p className="text-sm text-gray-500">Destination</p>


            </div>
            
            <div className="flex items-center gap-3">
             
             
                
                <p className="font-semibold text-gray-800">
                  {tripDetails.destination}
                </p>
            
            </div>
          </div>
        )}

        {tripDetails.groupSize && (
          <div className="bg-pink-100 text-pink-600 border-pink-200 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">

  <Users className="h-5 w-5 text-green-500" />

               <p className="text-sm text-gray-500">Travelers</p>


            </div>
            <div className="flex items-center gap-3">
             
             
               
                <p className="font-semibold text-gray-800">
                  {tripDetails.groupSize}
                </p>
             
            </div>
          </div>
        )}

        {tripDetails.budget && (
          <div className="bg-green-100 text-green-600 border-green-200 p-4 rounded-lg shadow-sm border">
            <div className="flex items-center gap-3">
 <DollarSign className="h-5 w-5 text-yellow-500" />

               <p className="text-sm text-gray-500">Budget</p>


            </div>
             
            <div className="flex items-center gap-3">
              
               
                <p className="font-semibold text-gray-800">
                  {tripDetails.budget}
                </p>
            </div>
          </div>
        )}

        {tripDetails.duration && (
          <div className="bg-purple-100 text-purple-600 border-purple-200 p-4 rounded-lg shadow-sm border">
             <div className="flex items-center gap-3">

 <Calendar className="h-5 w-5 text-purple-500" />

             <p className="text-sm text-gray-500">Destination</p>
             


            </div>
            
            <div className="flex items-center gap-3">
              
            
               
                <p className="font-semibold text-gray-800">
                  {tripDetails.duration}
                </p>
              
            </div>
          </div>
        )}
      </div>

      {/* View Trip Button */}
      <div className="flex justify-center mb-6">
        <Button
          className="bg-primary px-8 py-3 text-lg font-semibold shadow-lg"
        >
          <Eye className="h-5 w-5 mr-2" />
          View Trip Plan
        </Button>
      </div>
      {/* Additional Tips */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h5 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips</h5>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Book flights and hotels in advance for better rates</li>
          <li>• Check local weather and pack accordingly</li>
          <li>• Download offline maps for your destination</li>
          <li>• Research local customs and etiquette</li>
        </ul>
      </div>
    </div>
  );
};

export default FinalUi;
