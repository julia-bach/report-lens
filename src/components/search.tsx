import { SearchIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@heroui/react";
import { cn } from "@/utils/utils";

export default function Search({
  onClear,
  onChange,
  onBlur,
  className,
  children,
  defaultValue = ""
}: {
  onClear?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  className?: string;
  children?: React.ReactNode;
  defaultValue?: string;
}) {
  const t = useTranslations();
  const [value, setValue] = useState(defaultValue);

  const handleOnBlur = useCallback((event: React.FocusEvent<HTMLInputElement, Element>) => {
    onBlur?.(event);
  }, [onBlur]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  const clear = () => {
    const fakeEvent = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
    setValue("");
    onClear?.(fakeEvent);
    onChange?.(fakeEvent);
  };

  return (
    <div className={cn("items-center pb-5", className)}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={t("form.search")}
        onBlur={handleOnBlur}
        style={{ width: "100%" }}
        className="flex-grow h-10"
        isClearable
        onClear={clear}
        startContent={
          <SearchIcon size={18} className="text-gray-400"/>
        }
      />
      <div>
        {children}
      </div>
    </div>
  );
}
