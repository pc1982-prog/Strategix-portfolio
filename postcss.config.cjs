// ...existing code...
module.exports = {
  plugins: {
    // use require(...) form so PostCSS definitely resolves the adapter
    '@tailwindcss/postcss': require('@tailwindcss/postcss')(),
    autoprefixer: require('autoprefixer')(),
  },
}
// ...existing code...