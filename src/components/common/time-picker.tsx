'use client';

import React, {useMemo} from 'react';
import dayjs from '@/lib/day';
import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib';

type Props = {
  value?: string | null;
  onChange?: (value: string | null) => void;
  format?: string;
  placeholder?: string;
  className?: string;
};

export const TimePickerComponent: React.FC<Props> = ({
  value,
  onChange,
  format = 'HH:mm',
  className,
  placeholder
}) => {
  const pickerValue = useMemo(() => {
    if (!value) return null;

    const parsed = dayjs(value, format, true);

    if (!parsed.isValid()) return null;

    return new DateObject({
      date: parsed.toDate()
    });
  }, [value, format]);

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
      disableDayPicker
      format={format}
      value={pickerValue}
      onChange={handleChange}
      plugins={[<TimePicker key='time' position='bottom' hideSeconds />]}
      render={(value, openCalendar) => (
        <Input
          readOnly
          value={value}
          placeholder={placeholder}
          onClick={openCalendar}
          className={cn('w-full bg-background', className)}
        />
      )}
    />
  );
};
