const { src, dest, watch, parallel, series} = require('gulp')

const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const pug = require('gulp-pug')
const useref = require('gulp-useref')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin');


function images() {
    return src([
        'app/images/*',
    ])
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

function puged() {
    return src('app/*.pug')
    .pipe(pug({
        doctype: 'html',
        pretty: true,
    }))
    .pipe(dest('app'))
    .pipe(browserSync.stream())
}

function pugedIncludes() {
    return src('app/includes/*.pug')
    .pipe(browserSync.stream())
}

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

function browser() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
    .pipe(dest('dist'))
}

exports.images = images
exports.styles = styles
exports.scripts = scripts
exports.puged = puged
exports.pugedIncludes = pugedIncludes
exports.watching = watching
exports.browser = browser
exports.building = building

exports.build = series(building)
exports.default = parallel(styles, scripts, pugedIncludes, puged, browser, watching)