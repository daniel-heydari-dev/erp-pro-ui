import { CheckIcon, CloseIcon } from "../../icons";

interface PasswordCriteriaProps {
  password: string;
}

export const PasswordCriteria = ({ password }: PasswordCriteriaProps) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <CheckIcon className="mr-2 size-4 text-success" title="CheckIcon" />
          ) : (
            <CloseIcon className="mr-2 size-4 text-ds-3" title="CloseIcon" />
          )}
          <span className={item.met ? "text-success" : "text-ds-2"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
