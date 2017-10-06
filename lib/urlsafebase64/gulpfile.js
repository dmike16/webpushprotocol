const gulp = require('gulp');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
const project = ts.createProject("tsconfig.json");

function tsCompile() {
  gutil.log(gutil.colors.blue.bold('Compiling Urlbase64 ts Module.'));
  return new Promise((resolve, reject) => {
    project.src()
      .pipe(project())
      .js.pipe(gulp.dest("dist"))
      .on('finish', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

function d_ts(){
  gutil.log(gutil.colors.green.bold('Compiling Urlbase64 d.ts Module.'));
  return new Promise((resolve,reject)=>{
    project.src()
    .pipe(project()).dts
    .pipe(gulp.dest('./types'))
    .on('finish',()=>{
      resolve();
    })
    .on('error',(err)=>{
      reject(err);
    });
  });
}

gulp.task('build', () => {
  return tsCompile();
});

gulp.task('dts',()=>{
  return d_ts();
});

gulp.task('default',()=>{
  gutil.log(gutil.env);
});
