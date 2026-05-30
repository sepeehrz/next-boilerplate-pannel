"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/common/toast";

export function GoogleLoginComponent() {
  const translate = useTranslations("global");

  function loginWithGoogle() {
    toast.info(translate("comingSoon"));
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full border-border rounded-md h-10 text-sm font-medium leading-normal"
        onClick={loginWithGoogle}
      >
        {translate("google")}
      </Button>
    </>
  );
}
