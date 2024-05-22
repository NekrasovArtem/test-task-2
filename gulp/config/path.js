import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = './dist'
const appFolder = './app'

export const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js`,
        images: `${buildFolder}/images/`,
        fonts: `${buildFolder}/css/fonts/`,
        files: `${buildFolder}/*`,
    },
    src: {
        html: `${appFolder}/*.html`,
        pug: `${appFolder}/**/*.pug`,
        scss: `${appFolder}/scss/app.scss`,
        js: `${appFolder}/js/main.js`,
        images: `${appFolder}/images/*.*`,
        fonts: `${appFolder}/fonts/*.woff2`,
        files: `${appFolder}/*`,
    },
    watch: {
        pug: `${appFolder}/**/*.pug`,
        scss: `${appFolder}/scss/*.scss`,
        js: `${appFolder}/js/**/*.js`,
        files: `${appFolder}/*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    appFolder: appFolder,
    rootFolder: rootFolder,
    ftp: ``,
}