import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import rename from 'gulp-rename'

const sass = gulpSass(dartSass)

// Сборка стилей в директорию dist
export const styles = () => {
    return app.gulp.src(app.path.src.scss)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(sass({ 
            outputStyle: 'compressed', 
        }))
        .pipe(rename({
            basename: "style",
            extname: ".min.css"
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}