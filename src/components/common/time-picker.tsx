'use client';

import React, {useEffect, useState} from 'react';
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
  const [internalValue, setInternalValue] = useState<DateObject | null>(null);

  useEffect(() => {
    if (!value) {
      setInternalValue(null);
      return;
    }

    const parsed = dayjs(value, format, true);

    if (!parsed.isValid()) {
      setInternalValue(null);
      return;
    }

    const dateObj = new DateObject({
      date: parsed.toDate()
    });

    setInternalValue(dateObj);
  }, [value, format]);

  function handleChange(date: DateObject | null) {
    if (!date) {
      onChange?.(null);
      setInternalValue(null);
      return;
    }

    const serverValue = dayjs(date.toDate()).format(format);

    onChange?.(serverValue);
    setInternalValue(date);
  }

  return (
    <DatePicker
      disableDayPicker
      format={format}
      value={internalValue}
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
