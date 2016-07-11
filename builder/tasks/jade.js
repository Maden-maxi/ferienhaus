'use strict';
const gulp = require('gulp');
const jade = require('jade');
const katex = require('katex');
const gulpJade = require('gulp-jade');
const combiner = require('stream-combiner2').obj;
const notify = require('gulp-notify');
jade.filters.katex = katex.renderToString;
jade.filters.shoutFilter = (str) => str + '!!!!';

module.exports = (options) => {
	return () => {
		return combiner(
			gulp.src(options.src),
			gulpJade({
			  	jade: jade,
			  	pretty: true,
			}),
			gulp.dest(options.dst)
		).on('error', notify.onError());
	};
};