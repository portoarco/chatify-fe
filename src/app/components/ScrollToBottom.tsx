import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import React from "react";

interface IScrollToBottom {
  containerRef: React.RefObject<HTMLDivElement | null>;
}
export default function ScrollToBottom({ containerRef }: IScrollToBottom) {
  const handleClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  return (
    <Button
      size={"icon"}
      onClick={handleClick}
      className="bg-gray-400 text-white rounded-full fixed z-100 bottom-20 right-3 shadow-md"
    >
      <ArrowDown />
    </Button>
  );
}
