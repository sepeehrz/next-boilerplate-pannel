'use client';

import React, {useMemo} from 'react';
import dayjs from '@/lib/day';
import DateObject from 'react-date-object';
import {Input} from '@/components/ui/input';
import DatePicker from 'react-multi-date-picker';

import persian from 'react-date-object/calendars/persian';
import gregorian from 'react-date-object/calendars/gregorian';

import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import {cn} from '@/lib';

type CalendarMode = 'persian' | 'gregorian';

type Props = {
  value?: string | null | number;
  onChange?: (value: string | null) => void;
  format?: string;
  displayFormat?: string;
  placeholder?: string;
  minDate?: DateObject;
  maxDate?: DateObject;
  mode?: CalendarMode;
  className?: string;
};

export const DatePickerComponent: React.FC<Props> = ({
  value,
  onChange,
  format = 'YYYY/MM/DD',
  displayFormat = 'YYYY/MM/DD',
  minDate,
  maxDate,
  placeholder,
  className,
  mode = 'persian'
}) => {
  const calendar = mode === 'persian' ? persian : gregorian;
  const locale = mode === 'persian' ? persian_fa : gregorian_en;

  const pickerValue = useMemo(() => {
    if (!value) return null;

    const parsed =
      typeof value === 'number' ? dayjs(value) : dayjs(value, format, true);

    if (!parsed.isValid()) return null;

    return new DateObject({
      date: parsed.toDate(),
      calendar,
      locale
    });
  }, [value, format, calendar, locale]);

  function handleChange(date: DateObject | DateObject[] | null) {
    if (!date || Array.isArray(date)) {
      onChange?.(null);
      return;
    }

    const serverValue = dayjs(date.toDate()).format(format);

    onChange?.(serverValue);
  }

  return (
    <DatePicker
      containerClassName='w-full'
      className='w-full'
      value={pickerValue}
      onChange={handleChange}
      calendar={calendar}
      locale={locale}
      format={displayFormat}
      minDate={minDate}
      maxDate={maxDate}
      render={(value, openCalendar) => (
        <Input
          readOnly
          value={value}
          placeholder={placeholder}
          onClick={openCalendar}
          className={cn('bg-background w-full', className)}
        />
      )}
    />
  );
};
