// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// export const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY!,
// });

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking ONE relevant question at a time. 

CRITICAL RULES TO FOLLOW:
1. NEVER repeat questions that have already been answered
2. Track what information you already have from the conversation
3. Only ask for information that is missing
4. Ask questions in this EXACT order and ONLY ONCE each:
   - Starting location (source)
   - Destination city or country  
   - Group size (Solo, Couple, Family, Friends)
   - Budget (Low, Medium, High)
   - Trip duration (number of days) - ONLY ASK ONCE
   - Travel interests (adventure, sightseeing, cultural, food, nightlife, relaxation)
   - Special requirements or preferences

5. IMPORTANT: If the user provides trip duration (like "5 days", "3 days", etc.), NEVER ask for it again.

6. Once you have ALL required information, generate a complete trip plan with:
   - Detailed itinerary
   - Recommended activities
   - Budget breakdown
   - Travel tips
   - Accommodation suggestions

7. Use these exact UI triggers:
   - 'budget' - when asking about budget preferences
   - 'groupSize' - when asking about group size/travelers  
   - 'tripDuration' - when asking about trip duration (number of days) - ONLY ONCE
   - 'final' - when generating the complete final trip plan

8. If the user provides multiple pieces of information at once, acknowledge all of them and ask for the next missing piece.

9. Be conversational and friendly, but stay focused on collecting the required information.

10. NEVER ask for trip duration if the user has already provided it.

11. Check the conversation history carefully - if trip duration is mentioned anywhere, skip to the next question.

Return a JSON response with this exact format:
{
  "resp": "Your response text here",
  "ui": "budget/groupSize/tripDuration/final"
}`;


const FINAL_PROMPT = `Generate Travel Plan with given details. Give me Hotels options list with:
- Hotel Name
- Hotel address
- Price
- Hotel image URL
- Geo coordinates
- Rating
- Descriptions 

Also suggest itinerary with:
- Place Name
- Place Details
- Place Image URL
- Geo Coordinates
- Place address
- Ticket pricing
- Time travel each of the location
- Each day plan with best time to visit.

Return everything in strict JSON format.

Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "latitude": "number",
          "longitude": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ]
  },
  "itinerary": [
    {
      "day": "number",
      "day_plan": "string",
      "best_time_to_visit_day": "string",
      "activities": [
        {
          "place_name": "string",
          "place_details": "string",
          "place_image_url": "string",
          "geo_coordinates": {
            "latitude": "number",
            "longitude": "number"
          },
          "place_address": "string",
          "ticket_pricing": "string",
          "time_travel_each_location": "string",
          "best_time_to_visit": "string"
        }
      ]
    }
  ]
}
`;


// export async function POST(req: NextRequest) {
//   try {
//     const { messages,isFinal } = await req.json();

//     if (!process.env.OPENROUTER_API_KEY) {
//       return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 });
//     }

//     // Check if trip duration has already been provided
//     const hasDuration = messages.some((msg: any) => 
//       msg.role === "user" && 
//       (msg.content.toLowerCase().includes("days") || msg.content.toLowerCase().includes("day"))
//     );

//     // Log the conversation for debugging
//     console.log("Conversation history:", messages.length, "messages");
//     console.log("Has duration been provided:", hasDuration);
//     messages.forEach((msg: any, index: number) => {
//       console.log(`Message ${index + 1}:`, msg.role, "-", msg.content.substring(0, 100) + "...");
//     });

//     const completion = await openai.chat.completions.create({
//       model: "openai/o4-mini",
//       max_tokens: 512,
//       response_format: { type: 'json_object' },
//       messages: [
//         {
//           role: "system",
//           content: isFinal ? FINAL_PROMPT : PROMPT,
//         },
//         ...messages,
//       ],
//     });

//     const content = completion.choices?.[0]?.message?.content;

//     if (!content) {
//       return NextResponse.json({ error: "No response from AI" }, { status: 500 });
//     }

//     console.log("AI Response:", content);
//     return NextResponse.json(JSON.parse(content));
//   } catch (e: any) {
//     console.error("Trip Planner API Error:", e);
    
//     if (e.response?.status === 401) {
//       return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
//     } else if (e.response?.status === 429) {
//       return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
//     } else if (e.code === 'ENOTFOUND') {
//       return NextResponse.json({ error: "Network error - unable to reach API" }, { status: 500 });
//     }
    
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }   




// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { openai } from "@/config/Ai_Model";
import { NextRequest, NextResponse } from "next/server";

export async  function POST(req:NextRequest){
    try{ const{messages,isFinal} = await req.json();

    if(!process.env.OPENAI_API_KEY){
        return NextResponse.json({error:"OpenAI API key not configured"},{status:500})

    }
    //  Check if trip duration has already been provided
    const hasDuration = messages.some((msg: any) => 
      msg.role === "user" && 
      (msg.content.toLowerCase().includes("days") || msg.content.toLowerCase().includes("day"))
    );
    // Log the conversation for debugging
    console.log("Conversation history:", messages.length, "messages");
    console.log("Has duration been provided:", hasDuration);
    messages.forEach((msg: any, index: number) => {
      console.log(`Message ${index + 1}:`, msg.role, "-", msg.content.substring(0, 100) + "...");
    });
   
      const completion = await openai.chat.completions.create({
  model: "openai/gpt-oss-20b:free",
    response_format: { type: 'json_object' },
  messages: [
    {
      role: "system",
     content: isFinal ? FINAL_PROMPT : PROMPT,
    },
    ...messages, // Include the conversation history in the prompt
  ],

});

     const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    console.log("AI Response:", content);
    return NextResponse.json(JSON.parse(content));
  } catch (e: any) {
    console.error("Trip Planner API Error:", e);
    
    if (e.response?.status === 401) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    } else if (e.response?.status === 429) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    } else if (e.code === 'ENOTFOUND') {
      return NextResponse.json({ error: "Network error - unable to reach API" }, { status: 500 });
    }
    
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}      