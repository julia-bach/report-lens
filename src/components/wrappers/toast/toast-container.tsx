"use client";

import { BellRing, CheckCheck, Info, OctagonX, TriangleAlert } from "lucide-react";
import React from "react";
import { ToastContainer as Container } from "react-toastify";
import ToastCloseButton from "./toast-close-button";
import { cn } from "@/utils/utils";

const contextClass = {
  success: "text-lime-600 bg-white",
  error: "bg-white dark:bg-red-600 text-red-600",
  info: "text-blue-500 bg-white",
  warning: "text-yellow-600 bg-white",
  default: "text-slate-900 bg-white"
};

const contextIcon = {
  success: <CheckCheck size={16} className="text-lime-600" />,
  error: <OctagonX size={20} className="text-red-600" />,
  info: <Info size={16} className="text-blue-500" />,
  warning: <TriangleAlert size={16} className="text-yellow-600" />,
  default: <BellRing size={16} className="text-slate-900" />
};

export const ToastContainer = () => {
  return (
    <Container
      stacked
      hideProgressBar
      closeButton={ToastCloseButton}
      draggable="mouse"
      icon={(context) => {
        return contextIcon[context?.type || "default"];
      }}
      toastClassName={(context) => {
        return cn(
          contextClass[context?.type || "default"],
          "bg-opacity-80 backdrop-blur-md rounded flex flex-row p-6 items-center pointer-events-auto shadow-md"
        );
      }}
    />
  );
};
