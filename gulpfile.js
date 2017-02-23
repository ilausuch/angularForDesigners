
var gulp = require('gulp');
var concat  = require('gulp-concat');
var strip = require('gulp-strip-comments');
var uglify = require('gulp-uglify');
var headerfooter = require('gulp-header-footer');

var header="\
/*\n\
    MIT LICENSE @2017 Ivan Lausuch <ilausuch@gmail.com>\n\
    Developed at CEU University\n\
*/\n\n\
var AngularForDesigners=angular.module(\"angularForDesigners\", []);\n";

gulp.task('compile', function(){
    return gulp.src('src/*.js')
        .pipe(strip())
        .pipe(concat('angularForDesigners.js'))
        .pipe(headerfooter({
            header:header,
            footer:'',
            filter: function(file){
                return true;
            }
          }))
        .pipe(gulp.dest('dist'));
});

gulp.task('minimize', function(){
    return gulp.src('src/*.js')
        .pipe(headerfooter({
            header:header,
            footer:'',
            filter: function(file){
                return true;
            }
          }))
        .pipe(strip())
        .pipe(uglify())
        .pipe(concat('angularForDesigners.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task("build",["compile","minimize"]);