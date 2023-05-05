import "./globals.css";
import { Inter } from "next/font/google";

import Chat from "@/components/Chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "실시간 챗봇",
  description: "실시간 입니당",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Chat />
        {children}
      </body>
    </html>
  );
}
