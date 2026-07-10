// Helper function to check if a message is emoji-only
export const isEmojiOnly = (text: string) => {
  const trimmed = text.trim();
  if (!trimmed) return false;

  // If the message contains any normal alphanumeric letters, it's not emoji-only.
  // We match English, Vietnamese, Cyrillic, and numbers.
  const hasLettersOrNumbers = /[a-zA-Z0-9\u00C0-\u1EF9\u0400-\u04FF]/u.test(
    trimmed,
  );
  if (hasLettersOrNumbers) return false;

  // Check if it contains at least one emoji or symbol.
  // Emojis are generally represented by surrogate pairs in D800-DFFF, or symbols in miscellaneous symbol/pictograph ranges.
  const emojiRegex =
    /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u2600-\u27BF|[\u3000-\u303F]|[\u00ae\u00a9\u20e3]/;
  return emojiRegex.test(trimmed);
};
