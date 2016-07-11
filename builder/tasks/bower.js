'use strict';
const gulp = require('gulp');
const wiredep = require('gulp-wiredep');

module.exports = (options) => {
	return () => {
		return gulp.src(options.src)
		    .pipe(wiredep({
		      directory: options.dir
		    }))
		    .pipe(gulp.dest(options.dst));	
	};
};
