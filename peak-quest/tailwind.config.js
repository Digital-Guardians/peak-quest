/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        md: { max: "430px" },
        sm: { max: "320px" },
      },
      colors: {
        mint: "#13CBBF",
        turquoise: "#16CABD",
        green: "#009288",
        lightGreen: "#ECFFFE",
        turquoise: "#006259",
        purple: "#6B4BFB",
        lightPurple: "#F2EFFF",
        black: "#202220",
        darkGray: "#636363",
        gray: "#D9D9D9",
        lightGray: "#FAFAFA",
        white: "#FFFFFF",
      },
      fontSize: {
        "2xl": "24px",
        xl: "20px",
        lg: "16px",
        md: "12px",
        sm: "9px",
        xs: "8px",
        xxs: "4px",
      },
      screens: {
        md: { max: "430px" },
        sm: { max: "320px" },
      },
      boxShadow: {
        "3xl": "0px 3px 20px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
