import imagemin from "gulp-imagemin"

// Сборка изображений в директорию dist
export const images = () => {
    return app.gulp.src(app.path.src.images, { encoding: false })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "Images",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(imagemin(
            [
                imagemin.optipng(),
                imagemin.mozjpeg({ progressive: true }),
            ],
            {
                verbose: true
            }
        ))
        .pipe(app.gulp.dest(app.path.build.images))
}