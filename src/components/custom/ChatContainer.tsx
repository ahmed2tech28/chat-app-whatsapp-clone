import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ChatContainer() {
  return (
    <div className="w-full h-[83%] px-2 flex flex-col-reverse overflow-y-auto overflow-x-hidden">
      <div className="flex w-full justify-end">
        <Alert className="w-fit my-2">
          <AlertTitle>Shubam</AlertTitle>
          <AlertDescription className="max-w-[80ch]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore,
            ea at commodi officiis fuga beatae doloremque, delectus quae quaerat
            corrupti minus assumenda saepe ullam autem explicabo et neque, esse
            deserunt.
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex w-full justify-end">
        <Alert className="w-fit my-2">
          <AlertTitle>Shubam</AlertTitle>
          <AlertDescription className="max-w-[80ch]">
            How are you
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex w-full justify-start">
        <Alert className="w-fit my-2">
          <AlertTitle>Shubam</AlertTitle>
          <AlertDescription className="max-w-[80ch]">Hi</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default ChatContainer;
