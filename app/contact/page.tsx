"use client";

import { useState } from "react";

const topics = ["Order support", "Product question", "Returns", "Something else"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div>
        <p className="text-label-sm font-semibold uppercase tracking-[0.18em] text-primary">
          We are here to help
        </p>
        <h1 className="mt-1 text-headline-lg-mobile font-semibold text-on-surface md:text-headline-lg">
          Get in touch
        </h1>
        <p className="mt-1 text-body-sm text-on-surface-variant">
          Our support team is available 24/7 for every Kriztore customer.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start lg:gap-8 xl:gap-12">
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "chat", label: "Live chat", detail: "Replies in minutes" },
            { icon: "mail", label: "Email", detail: "support@kriztore.com" },
            { icon: "local_shipping", label: "Orders", detail: "Track and manage" },
            { icon: "assignment_return", label: "Returns", detail: "30-day window" }
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4"
            >
              <span className="material-symbols-outlined text-on-surface">{item.icon}</span>
              <p className="text-body-sm font-semibold text-on-surface">{item.label}</p>
              <p className="text-label-md text-on-surface-variant">{item.detail}</p>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-12 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-on-primary">
              <span className="material-symbols-outlined text-2xl">check</span>
            </span>
            <h2 className="text-headline-sm font-semibold text-on-surface">Message sent</h2>
            <p className="text-body-sm text-on-surface-variant">
              We will get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-2 text-label-md font-medium text-primary"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            className="flex w-full max-w-2xl flex-col gap-4 rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-4 md:p-6 lg:max-w-none"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <h2 className="text-headline-sm font-semibold text-on-surface">Send a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-label-md font-medium text-on-surface-variant">Your name</span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  className="rounded-lg border border-outline-variant/40 bg-surface px-3 py-2.5 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-label-md font-medium text-on-surface-variant">Email address</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="rounded-lg border border-outline-variant/40 bg-surface px-3 py-2.5 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
                />
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-label-md font-medium text-on-surface-variant">Topic</span>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <label
                    key={topic}
                    className={`rounded-full border px-3 py-1.5 text-label-md ${
                      index === 0
                        ? "border-primary bg-primary text-on-primary"
                        : "border-outline-variant/40 text-on-surface-variant"
                    }`}
                  >
                    <input type="radio" name="topic" defaultChecked={index === 0} className="sr-only" />
                    {topic}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex flex-col gap-1">
              <span className="text-label-md font-medium text-on-surface-variant">Message</span>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="How can we help?"
                className="resize-none rounded-lg border border-outline-variant/40 bg-surface px-3 py-2.5 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/60"
              />
            </label>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-label-lg font-semibold text-on-primary"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
              Send message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
