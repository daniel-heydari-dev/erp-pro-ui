export interface UniqueKeyOptions {
  prefix?: string;
  length?: number;
  entropy?: "high" | "normal";
}

const generateUniqueKey = ({
  prefix = "",
  length = 21,
  entropy = "high",
}: UniqueKeyOptions = {}): string => {
  const byteLength = Math.ceil(length / 2);

  const bytes =
    entropy === "high" && typeof crypto !== "undefined"
      ? crypto.getRandomValues(new Uint8Array(byteLength))
      : Array.from({ length: byteLength }, () => Math.floor(Math.random() * 256));

  const hex = (Array.from(bytes) as number[])
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, length);

  return `${prefix}${hex}`;
};

export default generateUniqueKey;
