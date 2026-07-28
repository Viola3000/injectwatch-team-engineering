import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const previewImage = new URL("/og.png", `${protocol}://${host}`).toString();

  return {
    title: "InjectWatch · From industrial signals to field decisions",
    description:
      "A synthetic, human-in-the-loop industrial monitoring pitch and candidate-response simulation.",
    openGraph: {
      title: "InjectWatch",
      description: "From industrial signals to field decisions.",
      images: [{ url: previewImage, width: 1672, height: 941 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "InjectWatch",
      description: "From industrial signals to field decisions.",
      images: [previewImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
