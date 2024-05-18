export const copy = () => {
    return app.gulp.src(app.path.app.files)
        .pipe(app.gulp.dest(app.path.build.files))
}