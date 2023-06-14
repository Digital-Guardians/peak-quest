/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mint: "#13CBBF",
        green: "#009288",
        turquoise: "#006259",
        purple: "#6B4BFB",
        black: "#202220",
        darkGray: "#636363",
        gray: "#D9D9D9",
        lightGray: "#FAFAFA",
        white: "#FFFFFF",
      },
      fontSize: {
        "text-2xl": "24px",
        "text-xl": "20px",
        "text-lg": "16px",
        "text-md": "12px",
        "text-sm": "9px",
        "text-xs": "8px",
      },
    },
  },
  plugins: [],
};
