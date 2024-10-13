import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToVND(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function loggingInformation(message: string, type: string) {
  const messageLog = `[${new Date().toLocaleTimeString()}]: ${message}`;
  switch (type) {
    case "info":
      console.info(messageLog);
      break;
    case "warning":
      console.warn(messageLog);
      break;
    case "error":
      console.error(messageLog);
      break;
    default:
      console.log(messageLog);
      break;
  }
}
