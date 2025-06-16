import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeaderNew from "@/components/site-header-new"
import SiteFooter from "@/components/site-footer"
import Chatbot from "@/components/chatbot"
import { cn } from "@/lib/utils"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dr. Diego F. Cuadros | Digital Epidemiology Laboratory",
  description: "Advancing Health Through Innovative Data Analytics. Geo-AI Insights for Better Public Health.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${merriweather.variable}`}>
      <body className={cn("min-h-screen font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <SiteHeaderNew />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Chatbot />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
