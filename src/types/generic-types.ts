import {
  Formats,
  MarkupTranslationValues,
  MessageKeys,
  NestedKeyOf,
  NestedValueOf,
  RichTranslationValues,
  TranslationValues
} from "use-intl"

export type Translations = {
  <TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey, values?: TranslationValues, formats?: Formats): string;
  rich<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey, values?: RichTranslationValues, formats?: Formats): React.ReactNode;
  markup<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey, values?: MarkupTranslationValues, formats?: Formats): string;
  raw<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey): any;
  has<TargetKey extends MessageKeys<NestedValueOf<any, "!">, NestedKeyOf<NestedValueOf<any, "!">>>>(key: TargetKey): boolean
}
