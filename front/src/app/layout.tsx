import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Gomamayo Share",
  twitter: {
    title: "Gomamayo Share",
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
