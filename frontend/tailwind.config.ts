import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        paper: "#f7f2ea",
        ember: "#f15b2a",
        gold: "#d8b45a",
        mist: "#bfb8af",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(216, 180, 90, 0.18), 0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "aurabox-radial":
          "radial-gradient(circle at top, rgba(238, 175, 95, 0.24), transparent 28%), radial-gradient(circle at 20% 20%, rgba(196, 133, 46, 0.16), transparent 20%), linear-gradient(180deg, #fbf8f2 0%, #f2ebe1 100%)",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floatSlow: "floatSlow 8s ease-in-out infinite",
        reveal: "reveal 900ms ease forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
