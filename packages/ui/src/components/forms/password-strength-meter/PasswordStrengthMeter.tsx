import { useMemo } from "react";

import { PasswordCriteria } from "./PasswordCriteria";

export interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({
  password,
}: PasswordStrengthMeterProps) {
  // Calculate password strength using an object mapping approach
  const getStrength = (pass: string): number => {
    const criteria = {
      minLength: pass.length >= 6,
      hasMixedCase: /[a-z]/.test(pass) && /[A-Z]/.test(pass),
      hasNumber: /\d/.test(pass),
      hasSpecialChar: /[^a-zA-Z\d]/.test(pass),
    };

    // Count the number of criteria that pass
    return Object.values(criteria).filter(Boolean).length;
  };

  // Memoize the strength calculation to avoid unnecessary recalculations
  const strength = useMemo(() => getStrength(password), [password]);

  // Determine strength color based on the calculated strength
  const getColor = (strength: number): string => {
    const colors = [
      "bg-ds-state-danger",
      "bg-ds-state-danger",
      "bg-ds-state-warning",
      "bg-ds-state-warning",
      "bg-ds-state-success",
    ];
    return colors[strength] || "bg-ds-surface-3";
  };

  // Get a text label corresponding to the password strength
  const getStrengthText = (strength: number): string => {
    const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    return strengthLevels[strength] || "Very Weak";
  };

  return (
    <div className="mt-2">
      {/* Strength Label */}
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs text-ds-2">Password strength</span>
        <span className="text-xs text-ds-2">{getStrengthText(strength)}</span>
      </div>

      {/* Strength Meter */}
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-ds-surface-3"
            }`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
}
