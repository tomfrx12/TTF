import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "TTF: Tutos Tom Fourneaux"
};

export default function RootLayout({ children }: Readonly <{ children: React.ReactNode; }>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body>
        <AuthProvider>
          <Header />
          <main className="min-h-[95vh]">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
