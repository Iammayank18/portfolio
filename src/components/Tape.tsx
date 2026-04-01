export const Tape = ({
  className,
  color = "bg-yellow-200/40",
}: {
  className?: string;
  color?: string;
}) => (
  <div
    className={`absolute w-16 h-6 ${color} rotate-[-15deg] z-10 border border-black/5 mix-blend-multiply shadow-sm ${className}`}
    style={{
      clipPath:
        "polygon(2% 0%, 98% 0%, 100% 15%, 98% 30%, 100% 45%, 98% 60%, 100% 75%, 98% 90%, 100% 100%, 0% 100%, 2% 85%, 0% 70%, 2% 55%, 0% 40%, 2% 25%, 0% 10%)",
    }}
  >
    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_4px)]" />
  </div>
);
