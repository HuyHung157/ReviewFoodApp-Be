var gulp = require('gulp');
const DIST = 'dist';
const isDev = process.env.NODE_ENV !== 'production';
gulp.task('copyServerFiles', function() {
  return gulp
    .src(['src/mail/templates/**/*', 'src/sms/templates/**/*'], { base: 'src' })
    .pipe(gulp.dest(DIST));
});
gulp.task('serverTasks', gulp.series('copyServerFiles'));
