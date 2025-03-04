import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { CartProvider } from "@/context/cart";

import { Header } from "../components/header";

export const metadata: Metadata = {
  title: "MBST",
  description: "Compra tus teléfonos al mejor precio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className="antialiased min-h-screen">
          <Header />
          <Toaster />
          <main className="px-4 md:px-10 lg:px-content">{children}</main>
        </body>
      </CartProvider>
    </html>
  );
}
