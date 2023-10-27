import gulp from  "gulp"
import gulpUglify from  "gulp-uglify"
import gulpLess from  "gulp-less"
import gulpCleanCSS from  "gulp-clean-css"
import gulpTS from "gulp-typescript";
import tscAlias from "gulp-ts-alias"
import sourcemap from "gulp-sourcemaps"
import babel from "gulp-babel"


const tsProject = gulpTS.createProject('tsconfig.json');

function tsCompileServer() {
    return gulp.src('./server/**/*.ts')
        .pipe(sourcemap.init())
        .pipe(tsProject()).js
        .pipe(tscAlias({ configPath: 'tsconfig.json'}))
        .pipe(gulpUglify())
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/server'));
}

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

function data(){
    return gulp.src('server/data/*')
        .pipe(gulp.dest('build/server/data'))
}

function ssl(){
    return gulp.src('server/ssl_keys/*')
        .pipe(gulp.dest('build/server/ssl_keys'))
}

gulp.task("server", tsCompileServer);
gulp.task("client", gulp.series(less, pug))
gulp.task("data", gulp.parallel(tsCompileClient, ssl, data))

gulp.task("default", gulp.series("server", "client", "data", function(done) {
    done();
}));