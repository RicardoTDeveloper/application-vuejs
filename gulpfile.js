var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var browserSync = require('browser-sync');

const path = {
    sass: {
        src: './public/assets/sass/**/*.scss'
    },
    css:{
        src: './public/assets/css'
    }
}

function sass() {
    return gulp.src(path.sass.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(path.css.src));
}

gulp.task('default', function () {
    
    browserSync.init({
        server: './public',
        port: 3000
        
    });

    gulp.watch(path.sass.src, sass)
    gulp.watch('./public').on('change', browserSync.reload)
});

exports.sass = sass;


