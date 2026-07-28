import { BookingCalendar } from "@/components/features/BookingCalendar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Book a consultation with Earlsdwara Digital. Choose your service, pick a date and time, and receive instant confirmation.",
};

export default function BookingPage() {
  return (
    <section className="mx-auto w-[min(1000px,92%)] pb-24 pt-32 md:pt-36">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Booking</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Reserve your consultation
        </h1>
        <p className="mt-4 text-subtext">
          Choose a service, select a date and time, and get confirmation instantly. We’ll prepare
          tailored recommendations before we meet.
        </p>
      </div>
      <BookingCalendar />
    </section>
  );
}
