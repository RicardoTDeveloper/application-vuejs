var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var browserSync = require('browser-sync');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var gulpBabel = require('gulp-babel');
var gulpAutoprefixer = require('gulp-autoprefixer');
var gulpCleanCss = require('gulp-clean-css');


const path = {
    sass: {
        src: './public/assets/sass/**/*.scss',
        dest: './public/assets/css'
    },
    javascript:{
        src: './public/assets/js/src/**/*.js',
        dest: './public/assets/js/'
    }
}

function sass() {
    return gulp.src(path.sass.src)
    .pipe(gulpSass())
    .pipe(gulpAutoprefixer({
        cascade: false
    }))
    .pipe(gulpCleanCss({compatibility: 'ie8'}))
    .pipe(gulpRename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest(path.sass.dest));
}

function javascript() {
    return gulp.src(path.javascript.src)
    .pipe(gulpRename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulpBabel({
        presets: ['@babel/env']
    }))
    .pipe(gulpUglify())
    .pipe(gulp.dest(path.javascript.dest));
}

gulp.task('default', function () {
    
    browserSync.init({
        server: './public',
        port: 3000
        
    });

    gulp.watch(path.sass.src, sass)
    gulp.watch(path.javascript.src, javascript)
    gulp.watch('./public').on('change', browserSync.reload)
});

exports.sass = sass;
exports.javascript = javascript;


