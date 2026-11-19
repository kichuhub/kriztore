type PhoneMockupProps = {
  color?: string;
  accent?: string;
  view?: "back" | "edge" | "front";
  className?: string;
  compact?: boolean;
  large?: boolean;
};

export function PhoneMockup({
  color = "#1b1b1d",
  accent = "#27272a",
  view = "back",
  className = "",
  compact = false,
  large = false
}: PhoneMockupProps) {
  const isEdge = view === "edge";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12), transparent 55%), linear-gradient(145deg, #eae7ea, #dcd9dc)"
      }}
    >
      <div
        className={`relative rounded-[2rem] border border-white/20 shadow-2xl transition-all duration-500 ${
          compact ? "h-36 w-[4.6rem]" : large ? "h-80 w-40 lg:h-96 lg:w-48" : "h-64 w-32"
        } ${isEdge ? "rotate-y-[70deg] scale-x-[0.35]" : ""}`}
        style={{ background: `linear-gradient(160deg, ${color}, ${accent})` }}
      >
        <div className="absolute inset-[3px] rounded-[1.85rem] border border-black/20" />
        {view === "front" ? (
          <div className="absolute inset-[5px] overflow-hidden rounded-[1.7rem] bg-black">
            <div className="absolute inset-x-0 top-0 h-5 rounded-t-[1.7rem] bg-black" />
            <div className="absolute left-1/2 top-1.5 h-2 w-10 -translate-x-1/2 rounded-full bg-neutral-900" />
            <div
              className="absolute inset-x-2 bottom-6 top-8 rounded-lg opacity-90"
              style={{
                background:
                  "linear-gradient(160deg, #1e3a8a 0%, #0f172a 35%, #581c87 70%, #111827 100%)"
              }}
            />
          </div>
        ) : (
          <>
            <div className={`absolute left-2 top-2 grid grid-cols-2 grid-rows-2 gap-1 rounded-2xl bg-black/40 p-1 backdrop-blur ${large ? "h-16 w-16" : "h-12 w-12"}`}>
              <span className="rounded-full bg-black shadow-inner" />
              <span className="rounded-full bg-black shadow-inner" />
              <span className="rounded-full bg-black shadow-inner" />
              <span className="rounded-full bg-black/70 shadow-inner" />
            </div>
            <div className="absolute bottom-4 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-white/20" />
          </>
        )}
      </div>
    </div>
  );
}
