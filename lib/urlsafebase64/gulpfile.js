const gulp = require('gulp');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const typedoc = require('gulp-typedoc');
const del = require('del');
const jsproject = ts.createProject("tsconfig.json");
const dtsproject = ts.createProject("tsconfig.json");

gulp.task('dist', () => {
  gutil.log(gutil.colors.green.bold('Build for prodaction'));
  return dist();
});

gulp.task('js', () => {
  gutil.log(gutil.colors.blue.bold('Compiling Urlbase64 ts Module.'));
  return ts_js();
});

gulp.task('dts', () => {
  gutil.log(gutil.colors.blue.bold('Compiling Urlbase64 d.ts Module.'));
  return d_ts();
});

gulp.task('clobber', () => {
  gutil.log(gutil.colors.red.bold('Cleaning project'));
  return del(['dist', 'types', 'docs']);
});

gulp.task('typedoc', () => {
  gutil.log(gutil.colors.magenta.bold('Generating documentation'));
  return docs();
});

gulp.task('default', () => {
  gutil.log(gutil.env);
});

function ts_js() {

  return new Promise((resolve, reject) => {
    jsproject.src()
      .pipe(jsproject())
      .js.pipe(gulp.dest("dist"))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function d_ts() {

  return new Promise((resolve, reject) => {
    dtsproject.src()
      .pipe(dtsproject()).dts
      .pipe(gulp.dest('./types'))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function docs() {
  return new Promise((resolve, reject) => {
    jsproject.src()
      .pipe(typedoc({
        module: 'commonjs',
        target: 'ES6',
        types: ['node'],
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        out: './docs',

        version: true,
        excludeExternals: true,
        includeDeclarations: true,
        mode: 'modules',
        excludePrivate: true,
        theme: 'minimal',
        name: 'Urlbase64'
      })).on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function dist() {
  return Promise.all([ts_js(), d_ts()]);
}
