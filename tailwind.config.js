/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["*.html"],
  corePlugins: {
    preflight: false,
  },
  prefix: "tw-",

  important: true,

  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) {...}
      laptop: "1024px",
      // => @media (min-width: 1024px) {...}
      desktop: "1280px",
      // => @media (min-width: 1280px) {...}
    },
    extend: {
      colors: {
        highlight: "#FFD700",
      },
    },
  },
  plugins: [],
};
