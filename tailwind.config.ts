import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-fixed-variant": "#484645",
        "primary-fixed-dim": "#c9c6c5",
        "surface-bright": "#fcf8fb",
        "on-secondary-container": "#626267",
        "on-background": "#1b1b1d",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#1c1b1b",
        "surface-dim": "#dcd9dc",
        "inverse-surface": "#303032",
        outline: "#747878",
        "on-primary": "#ffffff",
        "secondary-fixed-dim": "#c6c6cb",
        "surface-container-high": "#eae7ea",
        "on-error": "#ffffff",
        "on-tertiary-fixed": "#1d1b1a",
        "on-tertiary": "#ffffff",
        "secondary-container": "#e0dfe4",
        "on-surface-variant": "#444748",
        "on-primary-container": "#858383",
        "surface-container-low": "#f6f3f5",
        tertiary: "#000000",
        "surface-container": "#f0edef",
        "surface-container-highest": "#e4e2e4",
        secondary: "#5d5e63",
        "on-secondary-fixed-variant": "#46464b",
        surface: "#fcf8fb",
        "tertiary-fixed": "#e6e1df",
        "on-error-container": "#93000a",
        "tertiary-fixed-dim": "#cac6c3",
        "surface-tint": "#5f5e5e",
        "tertiary-container": "#1d1b1a",
        error: "#ba1a1a",
        "on-secondary": "#ffffff",
        background: "#fcf8fb",
        primary: "#000000",
        "surface-variant": "#e4e2e4",
        "on-secondary-fixed": "#1a1b1f",
        "on-surface": "#1b1b1d",
        "inverse-on-surface": "#f3f0f2",
        "primary-fixed": "#e5e2e1",
        "on-tertiary-container": "#868381",
        "outline-variant": "#c4c7c7",
        "secondary-fixed": "#e3e2e7",
        "on-primary-fixed-variant": "#474646",
        "error-container": "#ffdad6",
        "inverse-primary": "#c9c6c5",
        "primary-container": "#1c1b1b"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "gutter-mobile": "0.75rem",
        "margin-mobile": "1rem",
        "space-sm": "0.5rem",
        "space-xl": "2.5rem",
        "space-lg": "1.5rem",
        "space-md": "1rem",
        gutter: "1rem",
        "space-xs": "0.25rem",
        margin: "2rem"
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-lg": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "display-mobile": ["Inter", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"]
      },
      fontSize: {
        display: ["48px", { lineHeight: "52px", letterSpacing: "-0.03em", fontWeight: "600" }],
        "body-md": ["15px", { lineHeight: "22px", letterSpacing: "0em", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "18px", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-sm": ["13px", { lineHeight: "18px", letterSpacing: "0.005em", fontWeight: "400" }],
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.04em", fontWeight: "600" }],
        "headline-md": ["22px", { lineHeight: "28px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "display-mobile": ["36px", { lineHeight: "40px", letterSpacing: "-0.025em", fontWeight: "600" }],
        "headline-sm": ["18px", { lineHeight: "24px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "500" }],
        "body-lg": ["17px", { lineHeight: "24px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "headline-lg-mobile": ["26px", { lineHeight: "32px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "38px", letterSpacing: "-0.02em", fontWeight: "600" }]
      }
    }
  },
  plugins: []
};

export default config;
