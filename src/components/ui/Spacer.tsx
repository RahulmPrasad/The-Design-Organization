type SpacerProps = {
  /** Desktop height in px (maps to rem via webflow-embeds.css). */
  d: number;
  /** Tablet height, if different from desktop. */
  t?: number;
  /** Mobile height, if different from tablet. */
  m?: number;
};

export function Spacer({ d, t, m }: SpacerProps) {
  return <div aria-hidden="true" sp-d={d} sp-t={t ?? ""} sp-m={m ?? ""} className="spacer" />;
}
