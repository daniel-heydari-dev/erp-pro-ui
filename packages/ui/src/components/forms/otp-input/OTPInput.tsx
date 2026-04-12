import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from "react";

export type OTPInputSize = "sm" | "md" | "lg";
export type OTPInputVariant = "outlined" | "filled" | "underlined";

export interface OTPInputProps {
  /** Number of OTP digits */
  length?: number;
  /** Callback when OTP value changes */
  onChange?: (value: string) => void;
  /** Callback when all digits are filled */
  onComplete?: (value: string) => void;
  /** The current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Size of the input boxes */
  size?: OTPInputSize;
  /** Visual variant */
  variant?: OTPInputVariant;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether there's an error */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Placeholder character */
  placeholder?: string;
  /** Whether to mask the input (like password) */
  mask?: boolean;
  /** Whether to auto-focus the first input */
  autoFocus?: boolean;
  /** Input type - number only or alphanumeric */
  type?: "number" | "text";
  /** Custom className for the container */
  className?: string;
  /** Custom className for each input box */
  inputClassName?: string;
  /** Separator to show between groups of digits */
  separator?: React.ReactNode;
  /** Position(s) to show separator (e.g., [3] means after 3rd digit) */
  separatorPositions?: number[];
  /** Accessible label */
  "aria-label"?: string;
}

const sizeStyles: Record<OTPInputSize, string> = {
  sm: "w-9 h-10 text-base",
  md: "w-12 h-14 text-xl",
  lg: "w-14 h-16 text-2xl",
};

const variantStyles: Record<
  OTPInputVariant,
  { base: string; focus: string; error: string }
> = {
  outlined: {
    base: "border border-input bg-background-secondary rounded-lg text-foreground",
    focus: "focus:border-accent focus:ring-2 focus:ring-accent",
    error: "border-destructive",
  },
  filled: {
    base: "border border-transparent bg-accent-subtle rounded-lg text-foreground",
    focus:
      "focus:border-accent focus:bg-background-secondary focus:ring-2 focus:ring-accent",
    error: "bg-danger-subtle border-danger-border",
  },
  underlined: {
    base: "border-b-2 border-border-strong bg-transparent rounded-none text-foreground",
    focus: "focus:border-accent",
    error: "border-destructive",
  },
};

const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      onChange,
      onComplete,
      value: controlledValue,
      defaultValue = "",
      size = "md",
      variant = "outlined",
      disabled = false,
      error = false,
      errorMessage,
      placeholder = "",
      mask = false,
      autoFocus = false,
      type = "number",
      className = "",
      inputClassName = "",
      separator = <span className="text-neutral-400 text-2xl mx-2">—</span>,
      separatorPositions = [],
      "aria-label": ariaLabel = "One-time password",
    },
    ref,
  ) => {
    const [values, setValues] = useState<string[]>(() => {
      const initial = controlledValue ?? defaultValue;
      return initial
        .split("")
        .slice(0, length)
        .concat(Array(length).fill(""))
        .slice(0, length);
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Sync with controlled value
    useEffect(() => {
      if (controlledValue !== undefined) {
        const newValues = controlledValue
          .split("")
          .slice(0, length)
          .concat(Array(length).fill(""))
          .slice(0, length);
        setValues(newValues);
      }
    }, [controlledValue, length]);

    // Auto-focus first input
    useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const focusInput = useCallback(
      (index: number) => {
        if (index >= 0 && index < length && inputRefs.current[index]) {
          inputRefs.current[index]?.focus();
          inputRefs.current[index]?.select();
        }
      },
      [length],
    );

    const handleChange = useCallback(
      (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const char = inputValue.slice(-1);

        // Validate input based on type
        if (type === "number" && char && !/^\d$/.test(char)) {
          return;
        }

        const newValues = [...values];
        newValues[index] = char;
        setValues(newValues);

        const otpValue = newValues.join("");
        onChange?.(otpValue);

        // Move to next input if value entered
        if (char && index < length - 1) {
          focusInput(index + 1);
        }

        // Check if complete
        if (newValues.every((v) => v !== "") && newValues.length === length) {
          onComplete?.(otpValue);
        }
      },
      [values, onChange, onComplete, length, type, focusInput],
    );

    const handleKeyDown = useCallback(
      (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
          case "Backspace":
            e.preventDefault();
            const newValues = [...values];
            if (values[index]) {
              // Clear current value
              newValues[index] = "";
              setValues(newValues);
              onChange?.(newValues.join(""));
            } else if (index > 0) {
              // Move to previous and clear
              newValues[index - 1] = "";
              setValues(newValues);
              onChange?.(newValues.join(""));
              focusInput(index - 1);
            }
            break;
          case "ArrowLeft":
            e.preventDefault();
            focusInput(index - 1);
            break;
          case "ArrowRight":
            e.preventDefault();
            focusInput(index + 1);
            break;
          case "Delete":
            e.preventDefault();
            const deleteValues = [...values];
            deleteValues[index] = "";
            setValues(deleteValues);
            onChange?.(deleteValues.join(""));
            break;
        }
      },
      [values, onChange, focusInput],
    );

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, length);

        // Validate pasted content
        if (type === "number" && !/^\d*$/.test(pastedData)) {
          return;
        }

        const newValues = pastedData
          .split("")
          .slice(0, length)
          .concat(Array(length).fill(""))
          .slice(0, length);

        setValues(newValues);
        const otpValue = newValues.join("");
        onChange?.(otpValue);

        // Focus last filled input or last input
        const lastFilledIndex = newValues.findLastIndex((v) => v !== "");
        focusInput(Math.min(lastFilledIndex + 1, length - 1));

        // Check if complete
        if (newValues.every((v) => v !== "") && pastedData.length >= length) {
          onComplete?.(otpValue);
        }
      },
      [length, type, onChange, onComplete, focusInput],
    );

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    }, []);

    const renderInputs = () => {
      const inputs: React.ReactNode[] = [];

      for (let i = 0; i < length; i++) {
        // Add separator if needed
        if (separatorPositions.includes(i) && i > 0) {
          inputs.push(
            <div key={`separator-${i}`} className="flex items-center">
              {separator}
            </div>,
          );
        }

        inputs.push(
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
              // React 19: Return cleanup function
              return () => {
                inputRefs.current[i] = null;
              };
            }}
            type={mask ? "password" : "text"}
            inputMode={type === "number" ? "numeric" : "text"}
            pattern={type === "number" ? "\\d*" : undefined}
            maxLength={1}
            value={values[i] || ""}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            aria-label={`${ariaLabel} digit ${i + 1}`}
            className={`
              text-center font-semibold outline-none transition-all
              placeholder:text-muted-foreground
              ${sizeStyles[size]}
              ${variantStyles[variant].base}
              ${!error ? variantStyles[variant].focus : ""}
              ${error ? variantStyles[variant].error : ""}
              ${disabled ? "opacity-50 cursor-not-allowed bg-background-secondary" : ""}
              ${inputClassName}
            `}
          />,
        );
      }

      return inputs;
    };

    return (
      <div ref={ref} className={`flex flex-col gap-2 ${className}`}>
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label={ariaLabel}
        >
          {renderInputs()}
        </div>
        {error && errorMessage && (
          <span className="text-sm text-destructive">{errorMessage}</span>
        )}
      </div>
    );
  },
);

OTPInput.displayName = "OTPInput";

export default OTPInput;
export { OTPInput };
