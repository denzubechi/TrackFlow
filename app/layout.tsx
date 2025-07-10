import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/redux-provider";
import WhatsAppButton from "./WhatsAppButton";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrackFlow - Package Tracking Platform",
  description: "Real-time package tracking with precise location updates",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const whatsappNumber = "18122079729";
  const prefilledMessage = encodeURIComponent(
    "Hello TrackFlow support! I have a question about my package."
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}

          <WhatsAppButton
            phoneNumber={whatsappNumber}
            message={prefilledMessage}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
