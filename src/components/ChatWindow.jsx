import { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "agent", content: "Hello!" },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-md h-screen mx-auto p-4 border rounded-md shadow-lg bg-white">
      <MessageList messages={messages} loading={loading} />
      <MessageInput
        messages={messages}
        setMessages={setMessages}
        setLoading={setLoading}
      />
    </div>
  );
}
