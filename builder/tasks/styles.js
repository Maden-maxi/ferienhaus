'use strict';
const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const nib = require('nib');
const combiner = require('stream-combiner2').obj;
const resolver = require('stylus').resolver;
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = (options) => {
	return () => {
        return combiner(
        	gulp.src(options.src),
        	$.stylus({
        		use: nib(),
                url: resolver()
        	}),
        	gulp.dest('../app/css')
        ).on('error', $.notify.onError());
    };
};