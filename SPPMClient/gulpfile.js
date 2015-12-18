var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', ['serve']);

gulp.task('serve', function() {
    browserSync.init(null, {
        server: {
            baseDir: './www'
        },
        port: 7000,
        online: false
    });

    gulp.watch('www/**/*').on('change', browserSync.reload);
});