// Подключение gulp и плагинов
const { src, dest, watch, parallel, series} = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const useref = require('gulp-useref')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')
const clean = require('gulp-clean')

// Сборка изображений в папку dist
function images() {
    return src([
        'app/images/*',
    ], { encoding: false })
    .pipe(imagemin([
        imagemin.optipng(),
        imagemin.mozjpeg({
             progressive: true
        })
        ], 
        {
            verbose: true
        }))
    .pipe(dest('dist/images'))
}

// Сборка скриптов в один файл
function scripts() {
    return src([
        'app/js/**/*.js',
        '!app/js/main.min.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// Сборка стилей в один файл
function styles() {
    return src([
        'app/scss/**/*.scss',
        '!app/scss/style.min.scss'
    ])
    .pipe(concat('style.min.css'))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

// Сборка pug в html
function puged() {
    return src('app/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: true,
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

// Обновление pug-шаблонов (header, footer)
function pugedIncludes() {
    return src('app/includes/*.pug')
    .pipe(browserSync.stream())
}

// Наблюдатель 
function watching() {
    watch([
        'app/scss/**/*.scss',
        '!app/scss/style.min.scss'
    ], styles)

    watch([
        'app/js/**/*.js',
        '!app/js/main.min.js'
    ], scripts)
    
    watch('app/includes/*.pug', pugedIncludes)
    
    watch('app/*.pug', puged)
}

// Запуск dev-версии в браузере
function browser() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
}

// Сборка css/js/html в папку dist
function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
    .pipe(dest('dist'))
}

// Удаление папки dist
function cleanDist() {
    if (src('dist')) {
        return src('dist', { read: false })
        .pipe(clean())
    }
}

// Экспорт функций
exports.images = images
exports.styles = styles
exports.scripts = scripts
exports.puged = puged
exports.pugedIncludes = pugedIncludes
exports.watching = watching
exports.browser = browser
exports.building = building
exports.cleanDist = cleanDist

// Билд проекта
exports.build = series(cleanDist, images, building)

// Запуск dev-версии
exports.default = parallel(styles, scripts, images, pugedIncludes, puged, browser, watching)