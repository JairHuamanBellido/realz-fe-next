"use client";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useWebSocket(process.env.NEXT_PUBLIC_WS_URL || "", {});

  return (
    <html lang="en">
      <body className="bg-darkSurface font-satoshi">{children}</body>
    </html>
  );
}
