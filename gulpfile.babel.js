import gulp from  "gulp"
import gulpUglify from  "gulp-uglify"
import gulpLess from  "gulp-less"
import gulpCleanCSS from  "gulp-clean-css"
import gulpTS from "gulp-typescript";
import tscAlias from "gulp-ts-alias"
import sourcemap from "gulp-sourcemaps"
import babel from "gulp-babel"


const tsProject = gulpTS.createProject('tsconfig.json');

function tsCompileClient(){
    return gulp.src("./client/**/*.ts")
        .pipe(sourcemap.init())
        .pipe(tsProject()).js
        .pipe(tscAlias({ configPath: 'tsconfig.json'}))
        .pipe(babel())
        .pipe(gulpUglify())
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/client'));
}

function less() {
    return gulp.src('client/styles/style.less')
        .pipe(gulpLess())
        .pipe(gulpCleanCSS())
        .pipe(gulp.dest('build/client/styles'));
}

function pug(){
    return gulp.src('client/views/*')
        .pipe(gulp.dest('build/client/views'))
}

function ssl(){
    return gulp.src('server/ssl_keys/*')
        .pipe(gulp.dest('build/server/ssl_keys'))
}

gulp.task("client", gulp.series(less, pug))
gulp.task("data", gulp.parallel(tsCompileClient, ssl))

gulp.task("default", gulp.series("client", "data", function(done) {
    done();
}));