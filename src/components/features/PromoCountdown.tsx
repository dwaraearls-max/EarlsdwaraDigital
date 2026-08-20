import type { PromoCountdown } from "@/lib/promo";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function PromoCountdown({
  countdown,
  compact = false,
}: {
  countdown: PromoCountdown | null;
  compact?: boolean;
}) {
  if (!countdown) return null;

  const clock = `${countdown.days}d ${pad(countdown.hours)}h ${pad(countdown.minutes)}m`;

  if (compact) {
    return (
      <span className="whitespace-nowrap font-semibold">
        {countdown.label} {clock}
      </span>
    );
  }

  return (
    <p className="text-sm font-medium tracking-wide">
      {countdown.label}{" "}
      <span className="font-display text-lg font-bold">
        {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s
      </span>
    </p>
  );
}
