/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        md: { max: "430px" },
        sm: { max: "320px" },
        half: { max: "960px" },
      },
      colors: {
        red: "#BA1A1A",
        mint: "#13CBBF",
        turquoise: "#16CABD",
        green: "#009288",
        lightGreen: "#ECFFFE",
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
        sm: "10px",
      },
      // 중복 삭제 해야함
      screens: {
        md: { max: "430px" },
        sm: { max: "320px" },
        half: { max: "960px" },
      },
      boxShadow: {
        "3xl": "0px 3px 20px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
