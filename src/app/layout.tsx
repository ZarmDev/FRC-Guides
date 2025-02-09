import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SidebarProvider } from "@/components/ui/sidebar"
import { Providers } from "./providers";
import MainApp from "@/components/MainApp";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from '../components/navbar'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "FRC-guides"
};

// { children }: RootLayoutProps
export default function RootLayout({ children }: any) {
  return (
    <>
    {/* DO NOT REMOVE SUPPRESSHYDRATIONWARNING IT'S PART OF NEXT-THEMES */}
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <SidebarProvider>
                <AppSidebar></AppSidebar>
                <MainApp children={children}></MainApp>
              </SidebarProvider>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}