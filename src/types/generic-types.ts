import {
  Formats,
  MarkupTranslationValues,
  MessageKeys,
  NestedKeyOf,
  NestedValueOf,
  RichTranslationValues,
  TranslationValues
} from "use-intl";
import React from "react";

export type Translations = {
  <TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey, values?: TranslationValues, formats?: Formats): string;
  rich<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey, values?: RichTranslationValues, formats?: Formats): React.ReactNode;
  markup<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey, values?: MarkupTranslationValues, formats?: Formats): string;
  raw<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey): any;
  has<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey): boolean
}

export type ReportStatsDTO = {
  id?: number;
  duration: number;
  expected: number;
  flaky: number;
  skipped: number;
  startTime: string;
  startTimeMs: number;
  unexpected: number;
  total?: number;
}

export type ReportDTO = {
  _id: number;
  stats: ReportStatsDTO;
}

export interface GenericObject {
  [key: string]: any;
}

export type SpecState = "failed" | "flaky" | "skipped" | "passed";