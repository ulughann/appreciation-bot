export function locale(interactionLocale) {
  return interactionLocale === "en-US"
    ? "English"
    : interactionLocale === "ja"
    ? "Nihongo"
    : "English";
}
