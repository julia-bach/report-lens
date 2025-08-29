import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getDateTimeFormatted = (value: string) => {
  const date = new Date(value);
  const pad = (num: number): string => num.toString().padStart(2, "0");

  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const formatDuration = (durationInMicroseconds: number): string => {
  durationInMicroseconds = Math.floor(durationInMicroseconds / 1000);
  const hours = Math.floor(durationInMicroseconds / 3600);
  const minutes = Math.floor((durationInMicroseconds % 3600) / 60);
  const seconds = Math.floor(durationInMicroseconds % 60);

  const pad = (num: number): string => num.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

export const formatStartTime = (startTime: string): string => {
  if (!startTime) {
    return "-";
  }

  const date = new Date(startTime);
  return format(date, "EEEE, MMMM dd · HH:mm", { locale: enUS });
};

export const formatDurationText = (durationInMicroseconds: number) => {
  const duration = formatDuration(durationInMicroseconds);
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  const parts = [];

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  }

  if (parts.length > 0) {
    // if hours or minutes exist, ignore seconds
    return parts.length === 1 ? parts[0] : parts.join(" and ");
  }

  // hours and minutes are zero, show seconds if > 0
  if (seconds > 0) {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }

  return "-";
};

export const formatTestStatsText = (numberOfTests: number) => {
  if (numberOfTests === undefined || numberOfTests === null || numberOfTests <= 0) {
    return "-";
  }
  return numberOfTests.toString();
};

export function getCutoff(timeRange: string): number | null {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  if (timeRange === "1d") {
    return now - day;
  }

  if (timeRange === "7d") {
    return now - 7 * day;
  }

  if (timeRange === "30d") {
    return now - 30 * day;
  }

  return null;
}