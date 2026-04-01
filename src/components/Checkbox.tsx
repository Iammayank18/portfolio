export const Checkbox = ({ checked }: { checked: boolean }) => (
  <div
    className={`w-6 h-6 sketch-border flex items-center justify-center ${checked ? "bg-black" : "bg-transparent"}`}
  >
    {checked && <div className="w-3 h-3 bg-white rotate-45" />}
  </div>
);
