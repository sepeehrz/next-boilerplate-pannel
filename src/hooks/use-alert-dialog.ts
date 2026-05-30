import { useContext } from "react";
import { ConfirmContext } from "@/providers/alert-dialog-provider";

export function useAlertDialog() {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error(
      "useConfirmDialog must be used within ConfirmDialogProvider"
    );
  }
  return context.confirm;
}
