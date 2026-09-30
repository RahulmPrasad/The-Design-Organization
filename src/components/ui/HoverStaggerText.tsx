import "./hover-stagger-text.css";

function Letters({ text }: { text: string }) {
  return text.split("").map((char, i) => <span key={i}>{char === " " ? " " : char}</span>);
}

/** Text that rolls up to a duplicate of itself on hover (desktop only). */
export function HoverStaggerText({ text, className }: { text: string; className?: string }) {
  return (
    <div data-hover-stagger="" className={className}>
      <span className="original-text">
        <Letters text={text} />
      </span>
      <span className="clone-text" aria-hidden="true">
        <Letters text={text} />
      </span>
    </div>
  );
}
