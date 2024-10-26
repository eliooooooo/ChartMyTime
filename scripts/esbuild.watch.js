const fs = require('fs');
const esbuild = require('esbuild');
const postCssPlugin = require('esbuild-style-plugin');
const chokidar = require('chokidar');

const build = () => {
  fs.readdir('./public/src/js', (err, files) => {
    if(err) {
      console.error("erreur de lecture du dossier ./public/src/js");
      process.exit(1);
    }

    const entryPoints = files
      .filter(file => file.endsWith('.js'))
      .map(file => `./public/src/js/${file}`);

    entryPoints.forEach(entryPoint => {
      esbuild.build({
        entryPoints: [entryPoint],
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
      }).catch(() => process.exit(1));
    });
  });
}

// Run build once at the start
build();

// Then watch for file changes in js files
chokidar.watch('./public/src/js').on('change', (path) => {
  console.log(`File ${path} has been changed`);
  build();
});

// Then watch for file changes in scss files
chokidar.watch('./public/src/css/**/*.scss').on('change', (path) => {
  console.log(`File ${path} has been changed`);
  build();
});

// Then watch for file changes in twig files
chokidar.watch('./app/views/**/*.html.twig').on('change', (path) => {
  console.log(`File ${path} has been changed`);
  build();
});
