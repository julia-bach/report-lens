import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { AggregatedRow, ReportStatsDTO, SpecState } from "@/types/generic-types";

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

export const deriveSpecState = (spec: any): SpecState => {
  const hasFailed  = spec.tests?.some((t: any) => t.status === "unexpected");
  const hasFlaky   = spec.tests?.some((t: any) => t.status === "flaky");
  const allSkipped = spec.tests?.length > 0 && spec.tests.every((t: any) => t.status === "skipped");
  const allPassed  = spec.ok && !hasFailed && !hasFlaky && !allSkipped;

  if (hasFailed) {
    return "failed";
  }
  if (hasFlaky)  {
    return "flaky";
  }
  if (allSkipped) {
    return "skipped";
  }
  if (allPassed) {
    return "passed";
  }
  return "failed";
};

export function toDate(run: ReportStatsDTO): Date {
  return new Date(run.startTimeMs);
}

export function monthKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;
export function weekKey(date: Date): string {
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const diffDays = Math.floor((date.getTime() - yearStart.getTime()) / MS_PER_DAY);
  const week = Math.ceil((diffDays + yearStart.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function aggregateBy<T extends string>(runs: ReportStatsDTO[], keyFn: (d: Date) => T): AggregatedRow[] {
  const map = new Map<T, AggregatedRow>();
  for (const run of runs) {
    const d = toDate(run);
    const key = keyFn(d);

    const row =
      map.get(key) ??
      {
        period: key,
        passed: 0,
        failed: 0,
        flaky: 0,
        skipped: 0
      };

    row.passed += run.expected;
    row.failed += run.unexpected;
    row.flaky += run.flaky;
    row.skipped += run.skipped;

    map.set(key, row);
  }

  return Array.from(map.values()).sort((a, b) => a.period.localeCompare(b.period));
}