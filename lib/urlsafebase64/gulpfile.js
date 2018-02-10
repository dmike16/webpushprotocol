const gulp = require('gulp');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const del = require('del');
const jsproject = ts.createProject("tsconfig.json");
const jsDocproject = ts.createProject("./doc/tsconfig.docs.json");
const dtsproject = ts.createProject("tsconfig.json");
const PACKAGE = require('./package.json');
PACKAGE.file = 'placeholder';
const BANNER =
`
/**************************************
* Name        : <%= name %>
* Verision    : <%= version %>
* Description : <%= description %>
* Author      : <%= author%>
*
* Scripts     :<% for(let key in scripts){ %>
*               yarn run <%- key %> <%}%>
****************************************/`;

gulp.task('dist', () => {
  gutil.log(gutil.colors.green.bold('Build for prodaction'));
  return dist();
});

gulp.task('js', () => {
  gutil.log(gutil.colors.blue.bold('Compiling Urlbase64 ts Module.'));
  return ts_js(jsproject);
});

gulp.task('jsDoc', () => {
  gutil.log(gutil.colors.blue.bold('Compiling Urlbase64 ts Module.'));
  return ts_js(jsDocproject);
});


gulp.task('dts', () => {
  gutil.log(gutil.colors.blue.bold('Compiling Urlbase64 d.ts Module.'));
  return d_ts();
});

gulp.task('clobber', () => {
  gutil.log(gutil.colors.red.bold('Cleaning project'));
  return del(['dist', 'types', 'docs']);
});


gulp.task('default', () => {
  gutil.log(gutil.colors.yellow.bold(gutil.template(BANNER,PACKAGE)));
});

function ts_js(tsProject) {

  return new Promise((resolve, reject) => {
    tsProject.src()
      .pipe(tsProject())
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

function dist() {
  return Promise.all([ts_js(), d_ts()]);
}
