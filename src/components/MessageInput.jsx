import { useState } from "react";

export default function MessageInput({ messages, setMessages, setLoading }) {
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: input }],
            runId: "weatherAgent",
            maxRetries: 2,
            maxSteps: 5,
            temperature: 0.5,
            topP: 1,
            runtimeContext: {},
            threadId: "90",
            resourceId: "weatherAgent",
          }),
        }
      );

      const data = await response.text();
      const regex = /0:"(.*?)"/g;
      let match,
        finalText = "";
      while ((match = regex.exec(data)) !== null) finalText += match[1];

      setMessages((prev) => [
        ...prev,
        { role: "agent", content: finalText || "Could not parse response." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: "Failed to fetch weather." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        className="flex-1 border rounded-md px-3 py-2"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
