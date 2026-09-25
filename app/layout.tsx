import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/navigation/footer";
import { Header } from "@/components/navigation/header";
import { LocationGate } from "@/components/location/location-gate";
import { ToastProvider } from "@/components/ui";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-canvas`}
    >
      <body className="bg-canvas flex min-h-full flex-col text-ink">
        <ToastProvider>
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
          <LocationGate />
        </ToastProvider>
      </body>
    </html>
  );
}