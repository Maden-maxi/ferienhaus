'use strict';
const del = require('del');
module.exports = (options) => {
	return () => {
		return del(options.dst,{force:options.force});
	};
}