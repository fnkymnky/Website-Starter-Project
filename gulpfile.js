// --------------------------------------------
// Dependencies
// --------------------------------------------
var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// paths
var styleSrc = 'source/scss/**/*.scss',
    styleDest = 'css/',
    vendorSrc = 'source/js/vendors/',
    vendorDest = 'scripts/',
    scriptSrc = 'source/js/*.js',
    imageSrc = 'source/img/**',
    scriptDest = 'scripts/';

// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------


// Compiles all SCSS files
gulp.task('sass', function() {
    return gulp.src('source/scss/main.scss')
        .pipe(plumber())
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(prefix({ grid: true }))
        .pipe(cssmin())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
          }))
        .pipe(gulp.dest('css'))
});

// Uglify js files
gulp.task('scripts', function() {
    gulp.src('source/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest('scripts'));
});

//Concat and Compress Vendor .js files
gulp.task('vendors', function() {
    gulp.src(
            [
                'source/js/vendors/jquery.min.js',
                'source/js/vendors/**/*.js'
            ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('scripts'));
});



// Watch for changes
gulp.task('watch', function(){

    // Serve files from the root of this project
    browserSync.init({
        proxy: 'localhost:16739',
        ws: true,
        notify: false
    });

    gulp.watch(styleSrc,['sass']);
    // gulp.watch(styleSrc,['ie-sass']);
    gulp.watch(scriptSrc,['scripts']);
    gulp.watch(vendorSrc,['vendors']);
    // gulp.watch(imageSrc,['images']);
    gulp.watch(['css/*.css', 'scripts/*.js', 'source/*.html']).on('change', browserSync.reload);

});


// use default task to launch Browsersync and watch JS files
gulp.task('default', [ 'sass', 'scripts', 'vendors', 'watch'], function () {});
