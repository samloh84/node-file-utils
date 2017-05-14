const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function ftruncateSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/ftruncate.2.html|ftruncate(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.len
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_ftruncatesync_fd_len}
 */
var ftruncateSync = function (options) {
    var fd = _.get(options, 'fd');
    var len = _.get(options, 'len');

    return fs.ftruncateSync(fd, len);
};

module.exports = ftruncateSync;
