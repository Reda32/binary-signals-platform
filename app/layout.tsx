import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "./ThemeProvider";

const orbitron = Orbitron({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-orbitron",
});

export const metadata: Metadata = {
    title: "Binary Options Signals - Real-Time Trading Signals",
    description: "Get real-time binary options trading signals with 65-95% accuracy. Advanced algorithms including Adaptive, Neural, and Trend analysis for EUR/USD, GBP/USD, USD/JPY and more.",
    keywords: ["binary options", "trading signals", "forex", "cryptocurrency", "technical analysis"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={orbitron.className}>
                    <ConvexClientProvider>
                        <ThemeProvider>
                            {children}
                        </ThemeProvider>
                    </ConvexClientProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
