const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-style-plugin");

esbuild.build({
  logLevel: "debug",
  entryPoints: ["./public/src/js/main.js"],
  outdir: "dist",
  bundle: true,
  minify: true, 
  loader: {
    // ".svg": "file",
    // ".otf": "file",
    // ".eot": "file",
    // ".woff": "file",
    // ".woff2": "file"
  },
  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [
          require("postcss-import"),
          require("tailwindcss/nesting"),
          require("tailwindcss"),
          require("autoprefixer")],
      },
    }),
  ],
})
.then(result => { console.log('Js & css minifiés !!') })
.catch(() => process.exit(1));
