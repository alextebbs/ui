import "@/styles/globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/utils/cn";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const sans = IBM_Plex_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          sans.variable,
          "bg-background min-h-screen font-sans antialiased"
        )}
      >
        <div className="bg-white">{children}</div>
      </body>
    </html>
  );
}
