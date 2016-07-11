'use strict';
const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
	    var task = require(path).call(this, options);

	    return task(callback);
	});
}
lazyRequireTask('styles', './tasks/styles', {
	src: '../app/styl/*.styl'
});

lazyRequireTask('jade', './tasks/jade', {
	src: '../app/index.jade',
	dst: '../app'
});

lazyRequireTask('img', './tasks/img', {
	src: '../app/img/**/*',
	dst: '../dest/img'
});

lazyRequireTask('img:optim', './tasks/img', {
	src: '../app/img/optim/**/*',
	dst: 'opt'
});


lazyRequireTask('clean', './tasks/clean', {
	dst: '../dest',
	force: true
});


lazyRequireTask('bower', './tasks/bower', {
	src: '../app/index.html',
	dir: '../app/bower_components',
	dst: '../app'
});

lazyRequireTask('deploy', './tasks/deploy', {
	src: '../app/index.html',
	dst: '../dest'
});

gulp.task('assets', () => {
    return gulp.src('../app/assets/**/*')
    	.pipe(gulp.dest('../dest'));
});
gulp.task('styles:assets', () => {
    return gulp.src('../app/styles/**/*', {since: gulp.lastRun('styles')})
    	.pipe(gulp.dest('dest'));
});

gulp.task('build',
	gulp.series(
		'jade',
		'styles',
		'bower'
	)
);

gulp.task('dest',
	gulp.series(
		'clean',
		'jade',
		'styles',
		'bower',
		'assets',
		/*'img',*/
		'deploy'
	)
);

gulp.task('watch', () => {
	gulp.watch(['../app/**/*.styl'], gulp.series('styles'));
	gulp.watch(['../app/**/*.jade'], gulp.series('jade'));
	gulp.watch('bower.json', gulp.series('bower'));
});

lazyRequireTask('serve', './tasks/serve', {
	src: '../app',
	watch: '../app/**/*'
});
lazyRequireTask('serve:dest', './tasks/serve', {
	src: '../dest',
	watch: '../dest/**/*'
});
gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);