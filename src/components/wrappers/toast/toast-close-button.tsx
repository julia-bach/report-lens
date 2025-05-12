import { X } from "lucide-react";
import React from "react";
import { CloseButtonProps } from "react-toastify";
import { cn } from "@/utils/utils";

const contextClass = {
  success: "text-lime-600",
  error: "text-red-600",
  info: "text-blue-500",
  warning: "text-yellow-600",
  default: "text-slate-900"
};

export default function ToastCloseButton({ closeToast, type }: CloseButtonProps) {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    closeToast(e);
  };
  return (
    <div onClick={handleClose} className="absolute top-3 right-3">
      <X
        size={16}
        className={cn(contextClass[type || "default"], "cursor-pointer")}
      />
    </div>
  );
}