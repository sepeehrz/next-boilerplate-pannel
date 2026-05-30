"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const faToEn = (value: string) =>
  value.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

const formatNumber = (value: string) => {
  if (!value) return "";
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function CurrencyInput({
  value,
  onChange,
  placeholder,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = faToEn(e.target.value).replace(/[^0-9]/g, "");

    onChange(raw);

    setDisplayValue(formatNumber(raw));
  };

  return (
    <Input
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
