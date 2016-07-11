'use strict';
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
module.exports = (options) => {
	return () => {
		browserSync.init({
    		server: options.src
    	});
    	browserSync.watch(options.watch).on('change', browserSync.reload);
	};
};