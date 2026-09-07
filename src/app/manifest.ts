import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Homeland Recovery Service Ltd",
    short_name: "Homeland Recovery",
    description: "The secure, verified, and fastest way to recover your lost property.",
    start_url: "/",
    display: "standalone", // Hides the browser URL bar for a native app feel
    background_color: "#ffffff",
    theme_color: "#9333EA", // Matches your purple brand color
    icons: [
      {
        src: "/logo.png", // Ensure you have a square logo.png in your public folder
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}