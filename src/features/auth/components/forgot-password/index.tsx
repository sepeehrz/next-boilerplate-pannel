"use client";
import { useState } from "react";
import { LanguageSwitcher } from "../switchLang";
import { ResetComponent } from "./form/reset-password";
import { ForgotFormComponent } from "./form/forgot-password";

export type IMode = "forgot-password" | "reset-password";
export function ForgotPasswordComponent() {
  const [mode, setMode] = useState<IMode>("forgot-password");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4 relative">
      <div className="absolute top-4 ltr:right-4 rtl:left-4">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md">
        {mode === "forgot-password" ? (
          <ForgotFormComponent changeMode={(e) => setMode(e)} />
        ) : (
          <ResetComponent changeMode={(e) => setMode(e)} />
        )}
      </div>
    </div>
  );
}
