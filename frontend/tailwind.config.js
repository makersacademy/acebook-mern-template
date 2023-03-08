/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line global-require
    require("@tailwindcss/forms"),
  ],
};
