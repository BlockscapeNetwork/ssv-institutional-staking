/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'exo': ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "halloween",
    themes: [
      {
        garden: {
          ...require("daisyui/src/colors/themes")["[data-theme=garden]"],
          primary: "#E79132",
          "primary-focus": "#E79132",
        },
      },
      "halloween"
    ],
  },
}
