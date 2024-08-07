// components/DateRangePickerField.js
import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form'; // Import Controller from react-hook-form

const DateRangePickerField = ({ control, name }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <DateRangePicker
            value={value}
            onChange={onChange}
            renderInput={(startProps, endProps) => (
              <>
                <TextField
                  {...startProps}
                  onBlur={onBlur}
                  inputRef={ref}
                />
                <TextField
                  {...endProps}
                  onBlur={onBlur}
                  inputRef={ref}
                />
              </>
            )}
            slots={{ field: SingleInputDateRangeField }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateRangePickerField;
