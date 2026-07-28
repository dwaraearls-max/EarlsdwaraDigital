"use client";

import { Button } from "@/components/ui/Button";
import { bookingServices, bookingTimes } from "@/lib/data";
import { FormEvent, useMemo, useState } from "react";

function upcomingDates(count = 10) {
  const dates: string[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);
  while (dates.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(cursor.toISOString().slice(0, 10));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export function BookingCalendar() {
  const dates = useMemo(() => upcomingDates(), []);
  const [service, setService] = useState(bookingServices[0]);
  const [date, setDate] = useState(dates[0]);
  const [time, setTime] = useState(bookingTimes[2]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="glass rounded-3xl p-8 text-center md:p-12">
        <p className="font-display text-3xl font-bold md:text-4xl">You’re booked.</p>
        <p className="mx-auto mt-4 max-w-lg text-subtext">
          Confirmation sent to <span className="text-text">{email}</span>. We’ll meet for{" "}
          <span className="text-text">{service}</span> on{" "}
          <span className="text-text">
            {date} at {time}
          </span>
          .
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm text-subtext">Choose service</label>
            <div className="grid gap-2">
              {bookingServices.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setService(item)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm ${
                    service === item
                      ? "border-accent bg-accent/20 text-text"
                      : "surface-field text-subtext"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="book-name" className="mb-2 block text-sm text-subtext">
                Name
              </label>
              <input
                id="book-name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border surface-field px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="book-email" className="mb-2 block text-sm text-subtext">
                Email
              </label>
              <input
                id="book-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border surface-field px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm text-subtext">Select date</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {dates.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDate(item)}
                  className={`rounded-2xl border px-3 py-3 text-xs sm:text-sm ${
                    date === item
                      ? "border-accent bg-accent/20 text-text"
                      : "surface-field text-subtext"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm text-subtext">Select time</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {bookingTimes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTime(item)}
                  className={`rounded-2xl border px-3 py-3 text-xs sm:text-sm ${
                    time === item
                      ? "border-highlight bg-highlight/20 text-text"
                      : "surface-field text-subtext"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Confirm booking
          </Button>
        </div>
      </div>
    </form>
  );
}
