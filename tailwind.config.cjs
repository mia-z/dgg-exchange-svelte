/** @type {import("tailwindcss").Config} */

const colours = require("tailwindcss/colors");

module.exports = {
  content: ["src/**/*.{tsx,ts,js,jsx,html,svelte}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem"
      },
      colors: {
        ...colours,
        "bright-lilac": "#cd84f1",
        "light-purple": "#c56cf0",
        "light-slate-blue": "#7d5fff",
        "light-indigo": "#7158e2",
        "pretty-please": "#ffcccc",
        "young-salmon": "#ffb8b8",
        "light-red": "#ff4d4d",
        "red-orange": "#ff3838",
        "mandarin-sorbet": "#ffaf40",
        "radiant-yellow": "#ff9f1a",
        "unmellow-yellow": "#fffa65",
        "dorn-yellow": "#fff200",
        "wintergreen": "#32ff7e",
        "weird-green": "#3ae374",
        "electric-blue": "#7efff5",
        "hammam-blue": "#67e6dc",
        "neon-blue": "#18dcff",
        "spiro-disco-ball": "#17c0eb",
        "shadowed-steel": "#4b4b4b",
        "baltic-sea": "#3d3d3d",
        "white": "#ffffff",
        "purple": "#3f3cbb",
        "midnight": "#121063",
        "metal": "#565584",
        "tahiti": "#3ab7bf",
        "silver": "#ecebff",
        "bubble-gum": "#ff77e9",
        "bermuda": "#78dcca",
        "green": "#1db954",
        "black": "#191414",
        "text-black": "#404040"
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("flowbite/plugin")]
}