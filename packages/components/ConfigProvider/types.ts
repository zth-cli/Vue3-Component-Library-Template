export type TranslatePair = {
  [key: string]: string | string[] | TranslatePair;
};

export type Language = {
  name: string;
  el: TranslatePair;
};
export interface ConfigProviderProps {
  locale?: Language;
  extendsI18nMsg?: TranslatePair;
}
