import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-[min(720px,92%)] flex-col items-center justify-center pb-24 pt-32 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">Page not found</h1>
      <p className="mt-4 text-subtext">
        The page you&apos;re looking for doesn&apos;t exist—or has moved.
      </p>
      <Button href="/" className="mt-8">
        Return home
      </Button>
    </section>
  );
}
