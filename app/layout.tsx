import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LeadValueAI - Predict lead value & Optimize ad spend',
  description: 'Stop wasting budget on low-value leads. Our machine learning solution analyzes your data to predict lead value and optimize your Google Ads campaigns in real-time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950">{children}</body>
    </html>
  );
} 