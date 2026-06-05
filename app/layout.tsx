import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TTF: Tutos Tom Fourneaux"
};

export default function RootLayout({ children }: Readonly <{ children: React.ReactNode; }>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body>
        <Header />
        <main className="min-h-[95vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
