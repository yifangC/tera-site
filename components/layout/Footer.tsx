'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 60_000);
  return () => window.clearInterval(timer);
}
function localMessage() {
  const date = new Date();
  const hour = date.getHours();
  const time =
    hour < 6
      ? 'night'
      : hour < 12
        ? 'morning'
        : hour < 17
          ? 'afternoon'
          : hour < 21
            ? 'evening'
            : 'night';
  return `© ${date.getFullYear()} • Have a good ${date.toLocaleDateString('en-US', { weekday: 'long' })} ${time}!`;
}
const serverMessage = () => 'Have a good day!';

export default function Footer({ author }: { author: string }) {
  const message = useSyncExternalStore(subscribe, localMessage, serverMessage);
  return (
    <footer className="pt-16 pb-10 text-center text-sm">
      <div className="flex flex-wrap justify-center gap-x-2">
        <span>{author}</span>
        <span>{message}</span>
      </div>
    </footer>
  );
}
