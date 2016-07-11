'use strict';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combiner = require('stream-combiner2').obj;
module.exports = (options) => {
	return () =>{ 
		return combiner (
			gulp.src(options.src),
			$.newer(options.dst),
			$.imagemin(),
			gulp.dest(options.dst)
	  	);
	};
};