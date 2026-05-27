import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          dark: "#1f2937",
          slate: "#334155",
          steel: "#475569",
          mist: "#64748b",
          light: "#94a3b8",
        },
        accent: {
          DEFAULT: "#f59e0b",
          hover: "#d97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "industrial-gradient":
          "linear-gradient(135deg, #1f2937 0%, #334155 50%, #1f2937 100%)",
        "metal-texture":
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.37)",
        industrial: "0 4px 24px rgba(15, 23, 42, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
