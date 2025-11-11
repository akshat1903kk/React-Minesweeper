// postcss.config.cjs

/**
 * PostCSS configuration file
 * --------------------------
 * This tells Vite to use TailwindCSS for utility generation
 * and Autoprefixer to add vendor prefixes for better browser support.
 */

module.exports = {
  plugins: {
    // TailwindCSS handles all utilities, components, and base styling
    "tailwindcss/nesting": {}, // enables nesting just like Sass (optional but useful)
    tailwindcss: {},
    autoprefixer: {
      // ensures modern CSS works cross-browser
      flexbox: "no-2009",
      grid: "autoplace",
      overrideBrowserslist: ["last 3 versions", "not dead", "> 0.5%"],
    },
  },
};
