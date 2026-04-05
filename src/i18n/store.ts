let translationMessages: Record<string, string> = {}

export function setTranslationMessages(messages: Record<string, string>) {
  translationMessages = messages
}

export function translate(key: string) {
  return translationMessages[key] ?? key
}

