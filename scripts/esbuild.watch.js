const esbuild = require('esbuild');
const postCssPlugin = require('esbuild-style-plugin');

(async () => {
  let ctx = await esbuild.context({
    logLevel: 'debug',
    entryPoints: ['./public/src/js/main.js'],
    outdir: 'dist',
    bundle: true, 
    minify: false,
    loader: {
      '.svg': 'file',
      '.otf': 'file',
      '.eot': 'file',
      '.woff': 'file',
      '.woff2': 'file'
    },
    plugins: [
      postCssPlugin({
        postcss: {
          plugins: [
            require('postcss-import'),
            require('tailwindcss/nesting'),
            require('tailwindcss'),
            require('autoprefixer')
          ],
        },
      }),
    ],
  })
  
  await ctx.watch()
})();

