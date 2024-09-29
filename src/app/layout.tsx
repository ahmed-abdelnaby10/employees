import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthGuard from "@/guards/auth.guard";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { ClientProvider } from "@/lib/providers/clientProvider";
import { TooltipProvider } from "@/lib/providers/TooltipProvider";
import NavBar from "@/components/reusable-components/NavBar";
import StoreProvider from "@/lib/providers/StoreProvider";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Work Sphere',
    default: 'Home | Work Sphere'
  },
  description: 'Created by Ahmed M. Abdelnaby',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased sm:ml-14`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StoreProvider>
            <AuthGuard>
                <ClientProvider>
                  <TooltipProvider>
                    <NavBar />
                    {children}
                  </TooltipProvider>
                </ClientProvider>
            </AuthGuard>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
