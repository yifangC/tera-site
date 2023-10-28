'use client';
import { usePathname } from 'next/navigation';

export default function Page() {
    return <h2>You are currently here: {usePathname()} </h2>;
  }