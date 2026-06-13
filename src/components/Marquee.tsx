interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
}

/**
 * An infinite horizontal marquee. The item list is duplicated so the
 * -50% keyframe loops seamlessly; pauses on hover.
 */
export const Marquee = ({ items, reverse, className }: MarqueeProps) => {
  const loop = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div className={`marquee ${reverse ? "marquee--reverse" : ""}`}>
        {loop.map((item, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span>{item}</span>
            <span className="mx-6 text-[#f5b301]" aria-hidden>
              ✷
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
