"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlaygroundButtonProps, PostMessageData } from "@/lib/types";

// The default state of the button
const defaultProps: PlaygroundButtonProps = {
  variant: "default",
  size: "default",
  disabled: false,
  children: "Click Me",
};

export default function PreviewPage() {
  // 1. The Preview page maintains its own state
  const [props, setProps] = useState<PlaygroundButtonProps>(defaultProps);

  // 2. Set up an event listener to receive messages from the "Manager" (parent window)
  useEffect(() => {
    const handleMessage = (event: MessageEvent<PostMessageData>) => {
      // Simple data check (you should also check event.origin in production)
      if (event.data && event.data.type === "UPDATE_PROPS") {
        setProps(event.data.props);
      }
    };

    window.addEventListener("message", handleMessage);

    // Clean up the listener
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // Only run once when mounted

  // 3. Render the button in the center of the page for viewing
  return (
    <div className="flex h-screen w-full items-center justify-center bg-transparent">
      <Button
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
      >
        {props.children}
      </Button>
    </div>
  );
}
