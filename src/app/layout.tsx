import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Weather App",
  description: "App to check weather of any city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="text-center font-sans p-5 bg-sky-300 min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
