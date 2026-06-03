export const SUPPORTED_LOCALES = ['fa', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const namespaces = ['global', 'sideBar', 'auth'] as const;

export async function getMessages(locale: Locale) {
  const parts = await Promise.all(
    namespaces.map(ns =>
      import(`../../../messages/${locale}/${ns}.json`).then(m => m.default)
    )
  );

  return Object.assign({}, ...parts);
}
