// Импорт gulp`а, путей к файлам, плагинов
import gulp from 'gulp'
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js';

// Импорт задач
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js';
import { fonts } from './gulp/tasks/fonts.js';
import { styles } from './gulp/tasks/styles.js';
import { scripts } from './gulp/tasks/scripts.js';
import { images } from './gulp/tasks/images.js';
import { puged } from './gulp/tasks/pug.js';
import { server } from './gulp/tasks/server.js';

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Наблюдатель
function watcher() {
    gulp.watch(path.watch.scss, styles)
    gulp.watch(path.watch.js, scripts)
    gulp.watch(path.watch.pug, puged)
}

// Группировка задач
const mainTasks = gulp.parallel(fonts, styles, scripts, images, puged)
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)

// Задачи
gulp.task('styles', styles)
gulp.task('scripts', scripts)
gulp.task('puged', puged)
gulp.task('images', images)
gulp.task('fonts', fonts)
gulp.task('reset', reset)
gulp.task('default', dev)
gulp.task('build', build)