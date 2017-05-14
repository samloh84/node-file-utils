const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fstatSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/fstat.2.html|fstat(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {fs.Stats}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fstatsync_fd}
 */
var fstatSync = function (options) {
    var fd = _.get(options, 'fd');

    return fs.fstatSync(fd);

};

module.exports = fstatSync;
