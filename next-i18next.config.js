// const invariant = require('tiny-invariant');
// const path = require('path');

// invariant(
//   process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
//   'NEXT_PUBLIC_DEFAULT_LANGUAGE is required, but not set, check your .env file'
// );
// invariant(
//   process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES,
//   'NEXT_PUBLIC_AVAILABLE_LANGUAGES is required, but not set, check your .env file'
// );

// const isMultilangEnable =
//   process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' &&
//   !!process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

// function generateLocales() {
//   if (isMultilangEnable) {
//     return process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES.split(',');
//   }

//   return [process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE];
// }

// module.exports = {
//   i18n: {
//     defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? "en",
//     locales: generateLocales(),
//     localeDetection: isMultilangEnable,
//   },
//   localePath: path.resolve('./public/locales'),
//   reloadOnPrerender: process.env.NODE_ENV === 'development',
// };

const path = require('path');

// Function to get an environment variable or provide a default value
function getEnvVariable(variableName, defaultValue) {
  const value = process.env[variableName];
  if (value === undefined) {
    console.warn(
      `Warning: ${variableName} is not set. Using default value: ${defaultValue}`
    );
    return defaultValue;
  }
  return value;
}

// Set default values if the environment variables are not provided
const defaultLanguage = getEnvVariable('NEXT_PUBLIC_DEFAULT_LANGUAGE', 'en');
const availableLanguages = getEnvVariable(
  'NEXT_PUBLIC_AVAILABLE_LANGUAGES',
  defaultLanguage
);

const isMultilangEnable =
  process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG === 'true' && !!availableLanguages;

module.exports = {
  i18n: {
    defaultLocale: defaultLanguage,
    locales: isMultilangEnable
      ? availableLanguages.split(',')
      : [defaultLanguage],
    localeDetection: isMultilangEnable,
  },
  localePath: path.resolve('./public/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
