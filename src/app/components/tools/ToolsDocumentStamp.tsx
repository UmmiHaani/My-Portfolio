export type ToolsStampVariant = "verified" | "production" | "training";

interface ToolsDocumentStampProps {
  label: string;
  variant?: ToolsStampVariant;
}

export function ToolsDocumentStamp({
  label,
  variant = "verified",
}: ToolsDocumentStampProps) {
  return (
    <span
      className={[
        "tools-stamp",
        `tools-stamp--${variant}`,
      ].join(" ")}
      aria-hidden
    >
      {label}
    </span>
  );
}
