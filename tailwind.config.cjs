/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      extend:
        {
          colors: {
            charcoal: "#604652",
            slate: "#735557",
            coolgray: "#97866A",
            accent: "#D29F80",
            light: "#fdf8f4",
            muted: "#cabfb8",
            deep: "#2c1e24",
          },
          fontFamily: {
            body: ["Inter", "sans-serif"],
            heading: ["Poppins", "sans-serif"],
          },
        } + +{},
    },
    plugins: [],
  },
};
