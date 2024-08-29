import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { nerkoone } from "@/lib/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Errores",
  description: "Aplicación que calcula errores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${nerkoone}`}>{children}</body>
    </html>
  );
}
