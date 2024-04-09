import "./globals.css";
import Room from "./Room";

import { TooltipProvider } from "@/components/ui/tooltip";


import { Work_Sans } from "next/font/google";
export const metadata = {
  title: "Scribble Sync",
  description:
  "A whiteboarding application that uses fabric.js and Liveblocks to sync whiteboard drawings in real-time.",
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
<body className={`${workSans.className} bg-[#0d0f14]`}>
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </body>
  </html>
);

export default RootLayout;
