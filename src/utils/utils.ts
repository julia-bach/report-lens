import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDateTimeFormatted = (value: string) => {
  const date = new Date(value);
  const pad = (num: number): string => num.toString().padStart(2, "0");

  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export const formatDuration = (durationInMicroseconds: number): string => {
  durationInMicroseconds = Math.floor(durationInMicroseconds / 1000);
  const hours = Math.floor(durationInMicroseconds / 3600);
  const minutes = Math.floor((durationInMicroseconds % 3600) / 60);
  const seconds = Math.floor(durationInMicroseconds % 60);

  const pad = (num: number): string => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};