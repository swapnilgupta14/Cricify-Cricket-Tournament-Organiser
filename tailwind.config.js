/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        bgSecond: '#eaebf2',
        primary: "#229799",
        primaryLight: "#48CFCB",
        accent: "#424242",
        textPrimary: "#151515",
        textSecondary: "#828282",
        textMuted: "#393939",
        linkColor: "#229799",
        success: "#4caf50",
        warning: "#ff9800",
        error: "#f44336",
        info: "#2196f3",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      backgroundImage: {
        "dashboard-bg": "url('/public/Background1.jpg')",
      },
      screens: {
        "sm-custom": { max: "650px" }, 
      },
    },
  },
  plugins: [],
};
