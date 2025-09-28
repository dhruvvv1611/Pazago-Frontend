import Loader from "./Loader";

export default function MessageList({ messages, loading }) {
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg max-w-xs ${
              msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="px-4 py-2 bg-gray-200 rounded-lg">
            <Loader />
          </div>
        </div>
      )}
    </div>
  );
}
