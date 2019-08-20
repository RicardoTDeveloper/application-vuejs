var gulp = require('gulp');
var gulpSass = require('gulp-sass');
var browserSync = require('browser-sync');


const path = {
    sass: {
        src: './assets/sass/**/*.scss'
    },
    css:{
        src: './assets/css'
    }
}

function sass() {
    return gulp.src(path.sass.src)
    .pipe(gulpSass())
    .pipe(gulp.dest(path.css.src));
}


// gulp.task('watch', function () {
//     gulp.watch(path.sass.src, sass)
// });

gulp.task('default', function () {
    
    browserSync.init({
        server: './view',
        port: 3000
        
    });

    gulp.watch(path.sass.src, sass)

});

exports.sass = sass;


