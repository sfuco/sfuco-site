// gulpfile.js
// gulp configuration for sfuco-site
// Reference: https://github.com/shakyShane/jekyll-gulp-sass-browser-sync
// Author: Reinier Evangelista
// 2017

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cp = require('child_process');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var sass = require('gulp-sass');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
  };

// Build jekyll
gulp.task('jekyll-build', function(done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn(jekyll, ['build'],
    {stdio: 'inherit'})
    .on('close', done);
});

// Rebuild Jekyll/Page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
    browserSync.reload();
  });

gulp.task('browser-sync', ['build-css', 'jekyll-build'], function() {
  browserSync({server: {baseDir: '_site/'}});
});

// SASS compilation
gulp.task('build-css', function() {
  console.log('--Building CSS--');
  return gulp.src('./_sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
  .pipe(concat('style.css')) // Concatenate into one CSS file
  .pipe(gulp.dest('./_site/css')) // Note: The destination has to be _site/css since that's the live css
  .pipe(browserSync.reload({stream: true}))
  .pipe(gulp.dest('css'));
});

// Watch Tasks
gulp.task('watch', function() {
  gulp.watch('./_sass/**/*.scss', ['build-css']);
  gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*',
   '_sections/*', 'js/*'],
  ['jekyll-rebuild']);
  gulp.watch(['./*.yml'], ['jekyll-rebuild']);
});

// Default Task
gulp.task('default', ['browser-sync', 'watch']);
