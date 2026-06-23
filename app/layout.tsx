import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { GamifyProvider } from "@/components/gamify-provider";
import { XpToastLayer } from "@/components/xp-toast";
import { Celebrate } from "@/components/celebrate";
import { NicknameGate } from "@/components/nickname-modal";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Req'n Roll — Rock the Requirement. Ship the Value.",
    template: "%s · Req'n Roll",
  },
  description:
    "เวทีฝึกฝนสำหรับ BA / PM / PO: วัดสกิล เล่น Requirement ประจำวัน และอัปเดตเทคนิคการถามคำถามที่ใช้งานได้จริง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      data-scroll-behavior="smooth"
      className={`${ibmPlexSansThai.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          ข้ามไปยังเนื้อหา
        </a>
        <GamifyProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <XpToastLayer />
          <Celebrate />
          <NicknameGate />
        </GamifyProvider>
        <Footer />
      </body>
    </html>
  );
}
