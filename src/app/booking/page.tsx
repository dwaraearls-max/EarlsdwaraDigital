import { PromoCallout } from "@/components/features/PromoCallout";
import { BookingCalendar } from "@/components/features/BookingCalendar";
import { createShareMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createShareMetadata({
  title: "Book a Consultation",
  description:
    "Book a consultation with Earlsdwara Digital. Choose your service, pick a date and time, and receive confirmation by email.",
  path: "/booking",
});

export default function BookingPage() {
  return (
    <section className="page-pad-top mx-auto w-[min(1000px,92%)] pb-24">
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
      <div className="mb-8">
        <PromoCallout compact />
      </div>
      <BookingCalendar />
    </section>
  );
}
