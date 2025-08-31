"use client";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const suggestions = [
  {
    title: "Create a Trip",
    icon: <Globe2 className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Inspire me a Trip",
    icon: <Plane className="h-5 w-5 text-green-500" />,
  },
  {
    title: "Disscover New Places",
    icon: <Landmark className="h-5 w-5 text-orange-500" />,
  },
  {
    title: "Adventure Ideas and Plans",
    icon: <Globe2 className="h-5 w-5 text-yellow-500" />,
  },
];

const Hero = () => {
  const { user } = useUser();
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>("");

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    // Only navigate if there's actual input
    if (userInput.trim()) {
      // Store the user input in sessionStorage or localStorage for the next page
      sessionStorage.setItem("initialTripInput", userInput);
      router.push("/create-new-trip");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSuggestionClick = (suggestionTitle: string) => {
    setUserInput(suggestionTitle);
    // Don't auto-submit, let user modify if needed
  };

  return (
    <div className="mt-24 flex items-center justify-center">
      {/* content */}

      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="md:text-5xl text-xl font-bold">
          Hey, I'm your Personal{" "}
          <span className="text-primary">Trip Planner</span>
        </h1>
        <p className="md:text-lg text-base text-gray-500">
          Tell me What you want to do and I will plan the perfect trip for you:
          Flight, Hotels, Activities{" "}
        </p>

        {/* Input box */}
        <div>
          <div className="border rounded-2xl p-4 relative">
            <Textarea
              placeholder="What do you want to do"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none placeholder:text-lg text-xl"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            <Button
              size="icon"
              className="right-6 bottom-6 absolute"
              onClick={() => onSend()}
              disabled={!userInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Suggestions list */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground duration-200"
              onClick={() => handleSuggestionClick(suggestion.title)}
            >
              {suggestion.icon}
              <h2 className="text-sm">{suggestion.title}</h2>
            </div>
          ))}
        </div>
        {/* Video Section */}
        <div className=" flex flex-col items-center justify-center">
          <h2 className="my-7 mt-14 gap-2 flex text-center">
            Not Sure to start? <strong>See How It Works </strong>
            <ArrowDown />
          </h2>

          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="http://mma.prnewswire.com/media/2401528/1_MindtripProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
