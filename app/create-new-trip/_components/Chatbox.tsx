"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import TripDurationUi from "./TripDurationUi";
import FinalUi from "./FinalUi";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasProvidedDuration, setHasProvidedDuration] =
    useState<boolean>(false);
    const[isFinal, setIsFinal] = useState(false);

  // Check for initial input from Hero page
  useEffect(() => {
    const initialInput = sessionStorage.getItem("initialTripInput");
    if (initialInput) {
      setUserInput(initialInput);
      sessionStorage.removeItem("initialTripInput"); // Clear after reading
    }
  }, []);

  const onSend = async (inputText?: string) => {
    const textToSend = inputText || userInput;
    if (!textToSend?.trim()) return;

    setLoading(true);
    setUserInput("");

    // Check if this is a duration response
    if (
      textToSend.toLowerCase().includes("days") ||
      textToSend.toLowerCase().includes("day")
    ) {
      setHasProvidedDuration(true);
    }

    const newMsg: Message = {
      role: "user",
      content: textToSend,
    };

    // Create the updated messages array with the new message
    const updatedMessages = [...messages, newMsg];

    // Update the messages state immediately
    setMessages(updatedMessages);

    // Debug logging
    console.log("Sending message:", textToSend);
    console.log("Total messages being sent:", updatedMessages.length);

    try {
      const result = await axios.post("/api/aimodel", {
        messages: updatedMessages, // Send the updated messages array
        isFinal: isFinal
      });

      console.log("API Response:", result.data);

     !isFinal && setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content:
            result?.data?.resp ||
            "Sorry, I encountered an error. Please try again.",
          ui: result?.data?.ui,
        },
      ]);
    } catch (error: any) {
      console.error("API Error:", error);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content:
            error?.response?.data?.error ||
            "Sorry, I encountered an error. Please try again.",
          ui: undefined,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleUISelection = (selectedValue: string) => {
    // Automatically send the selected value
    onSend(selectedValue);
  };

  const RenderGenrativeUi = (ui: string) => {
    if (ui === "budget") {
      return <BudgetUi onSelectOption={handleUISelection} />;
    } else if (ui === "groupSize") {
      return <GroupSizeUi onSelectOption={handleUISelection} />;
    } else if (ui === "tripDuration" && !hasProvidedDuration) {
      return <TripDurationUi onSelectOption={handleUISelection} />;
    } else if (ui === "final") {
      return (
        <FinalUi
          tripPlan={
            messages[messages.length - 1]?.content || "Trip plan not available"
          }
          messages={messages}
        />
      );
    }
    return null;
  };

  useEffect(( )=>{
    const lastMsg = messages[messages.length - 1];
    if(lastMsg?.ui === "final"){
      setIsFinal(true);
      setUserInput("Ok, Grate! I have created your trip plan.");
     
    }
  },[messages])

  useEffect(() => {
    if (userInput && isFinal) {
      onSend();
    }
  }, [userInput]);

  return (
    <div className="flex flex-col h-[85vh]">
      {messages?.length === 0 && (
        <EmptyBoxState onSelectOption={handleUISelection} />
      )}

      {/* display Massage */}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role === "user" ? (
            <div key={index} className="flex justify-end mt-2">
              <div className="max-w-lg bg-primary text-white px-4 py-2 rounded-lg">
                {msg.content}
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start mt-2">
              <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
                {msg.content}
                {RenderGenrativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-sm">
                  Please wait while I generate your itinerary...
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* user input */}
      <section>
        <div className="border rounded-2xl p-4 relative text-lg">
          <Textarea
            placeholder="Start typing..."
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none placeholder:text-lg"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <Button
            size={"icon"}
            className="right-6 bottom-6 absolute"
            onClick={() => onSend()}
            disabled={!userInput.trim() || loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Chatbox;
