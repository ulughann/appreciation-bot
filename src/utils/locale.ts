export function locale(interactionLocale) {
  
  let locale = interactionLocale.locale;
  if (locale === "ja") {
    locale = "Nihongo";
  } else if (locale === "tr") {
    locale = "Turkish";
  } else {
    locale = "English";
  }
  return locale;


}
