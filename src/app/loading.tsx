export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-gradient-to-br from-highlight to-accent" />
        <p className="font-display text-base tracking-[0.35em] text-accent">EARLSDWARA</p>
      </div>
    </div>
  );
}
