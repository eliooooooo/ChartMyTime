const fs = require('fs');
const esbuild = require("esbuild");
const postCssPlugin = require("esbuild-style-plugin");

fs.readdir('./public/src/js', (err, files) => {
  if(err) {
    console.error("erreur de lecture du dossier ./public/src/js");
    process.exit(1);
  }

  const entryPoints = files
    .filter(file => file.endsWith('.js'))
    .map(file => `./public/src/js/${file}`);

  esbuild.build({
    logLevel: "debug",
    entryPoints: entryPoints,
    outdir: "dist",
    bundle: true,
    minify: false, 
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
});