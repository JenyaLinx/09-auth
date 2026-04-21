import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Roboto } from "next/font/google";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notes app with authentication",
  openGraph: {
    title: "NoteHub",
    description: "Notes app with authentication",
    url: "https://notehub.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}