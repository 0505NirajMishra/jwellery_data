import invariant from 'tiny-invariant';

const defaultLan = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE;
const defaultMultiLan = process.env.NEXT_PUBLIC_ENABLE_MULTI_LANG;
const available = process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES;

invariant(
  defaultLan,
  'Default language is not set'
);

if (defaultMultiLan === 'true') {
  invariant(
    defaultLan,
    'Available language is not set'
  );
}

export const Config = {
  defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE ?? 'en',
  availableLanguages: available
    ? available.split(',')
    : [],
  enableMultiLang: defaultMultiLan === 'true',
  rtlLanguages: ['ar', 'fa', 'he'],
  getDirection: (language: string | undefined) => {
    if (!language) return 'ltr';
    return Config.rtlLanguages.includes(language) ? 'rtl' : 'ltr';
  },
};