import type { Metadata } from "next";
import { Inter, Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import { MusicToggle, GlobalMusicManager } from "../components";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "Chacha's 19th Birthday 🎂💕",
  description: "A magical, interactive birthday website filled with love, surprises, and beautiful memories. Happy 19th Birthday to the most amazing person!",
  keywords: ["Chacha", "19th birthday", "love", "surprise", "pink", "interactive", "birthday website"],
  authors: [{ name: "Nicholas" }],
  metadataBase: new URL('https://chachabirthday.vercel.app'),
  openGraph: {
    title: "Chacha's 19th Birthday 🎂💕",
    description: "A magical, interactive birthday website filled with love and surprises",
    type: "website",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Chacha's 19th Birthday",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chacha's 19th Birthday 🎂💕",
    description: "A magical, interactive birthday website filled with love and surprises",
    images: ["/icon-512x512.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Chacha's 19th Birthday",
    statusBarStyle: "default",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#FF66A3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${dancingScript.variable} font-body antialiased bg-[linear-gradient(135deg,#FFF5FA,#FFE3F0)] min-h-dvh text-[15px] sm:text-[16px] leading-relaxed`}
      >
        <div className="relative">
          <GlobalMusicManager />
          {children}
          <MusicToggle />
        </div>
      </body>
    </html>
  );
}
