import pug from 'gulp-pug'

// Сборка pug-файлов в директорию dist
export const puged = () => {
    return app.gulp.src(app.path.src.pug)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "PUG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(pug({
            doctype: 'html',
            pretty: true,
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())
}