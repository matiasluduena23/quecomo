"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

export default function InitialChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/initial",
      credentials: "same-origin",
      keepLastMessageOnError: true,
    });
  const [formActive, setFormActive] = useState(true);

  useEffect(() => {
    if (messages.filter((item) => item.role === "user").length === 2) {
      setFormActive(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-8 max-w-sm text-center mb-52">
      <div>
        <p>Hola! Mi nombre es Feli</p>
        <p>Soy tu ayudante de cocina</p>
        <p>Cual es tu nombre?</p>
      </div>

      <div className="space-y-2">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "User: " : "Feli: "}
            {message.content}
          </div>
        ))}
      </div>

      {formActive ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            name="prompt"
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      ) : (
        <Button className="w-full">Comenzar a cocinar</Button>
      )}
    </div>
  );
}
