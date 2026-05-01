const CONVERSATION_KEY = "health_knowledge_conversation_id";

export function getOrCreateConversationId() {
  const existing = window.localStorage.getItem(CONVERSATION_KEY);
  if (existing) return existing;

  const nextValue =
    typeof crypto?.randomUUID === "function"
      ? `convo_${crypto.randomUUID()}`
      : `convo_${Date.now()}`;

  window.localStorage.setItem(CONVERSATION_KEY, nextValue);
  return nextValue;
}
