export default function Message({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs break-words ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
