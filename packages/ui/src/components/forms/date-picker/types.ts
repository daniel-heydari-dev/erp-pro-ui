export type DateRangeValue = { start: Date | null; end: Date | null };
export type DatePickerValue = Date | null | DateRangeValue;

export interface DatePickerPreset {
  label: string;
  value: () => DatePickerValue;
}

export interface DatePickerProps {
  mode?: "single" | "range";
  value?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  presets?: DatePickerPreset[];
}
