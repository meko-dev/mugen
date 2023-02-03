import fs from 'fs/promises';
import * as esbuild from 'esbuild';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';

const watchPlugin = {
  name: 'watch-plugin',
  setup(build) {
    build.onStart(() => {
      console.time('Build Time');
    });

    build.onEnd(() => {
      console.timeEnd('Build Time');
    });
  }
};

const postCssPlugin = {
  name: 'postcss',
  setup(build) {
    build.onLoad({ filter: /.css/ }, async (args) => {
      let css = await fs.readFile(args.path);
      const result = await postcss([postcssImport, postcssNested, autoprefixer]).process(css, { from: args.path });
      css = await esbuild.transform(result.css, { loader: 'css', minify: true });

      return { loader: 'text', contents: css.code };
    });
  }
}

if (process.env.WORKFLOW === 'browser') {
  console.log('Browser build started!');

  const buildOptions = {
    entryPoints: ['src/build.browser.js'],
    bundle: true,
    outfile: 'dist/mugen.browser.js',
    plugins: [watchPlugin, postCssPlugin]
  };

  if (!!process.env.WATCH) {
    const context = await esbuild.context(buildOptions);
    await context.watch();
  } else {
    await esbuild.build({ ...buildOptions, minify: true });
  }
} else {
  console.log('Module build started!');

  const componentBuildOptions = {
    entryPoints: [
      { out: 'components/icon', in: 'src/components/icon/index.js' },
      { out: 'components/input', in: 'src/components/input/index.js' },
      { out: 'components/button', in: 'src/components/button/index.js' }
    ],
    bundle: true,
    format: 'esm',
    outdir: 'dist',
    plugins: [postCssPlugin]
  };
  
  await esbuild.build({ ...componentBuildOptions });

  const mainBuildOptions = {
    entryPoints: [
      { out: 'mugen.modules', in: 'src/build.modules.js' }
    ],
    bundle: false,
    format: 'esm',
    outdir: 'dist'
  };

  await esbuild.build({ ...mainBuildOptions });
}


