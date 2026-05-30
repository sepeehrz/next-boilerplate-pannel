import { NextRequest, NextResponse } from "next/server";

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "fa"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function setLocaleCookie(request: NextRequest, response: NextResponse) {
  const cookieLocale = request.cookies.get("lang")?.value;

  const locale: Locale = SUPPORTED_LOCALES.includes(cookieLocale as any)
    ? (cookieLocale as Locale)
    : DEFAULT_LOCALE;

  response.cookies.set("lang", locale, {
    path: "/",
    sameSite: "lax",
  });

  return locale;
}
