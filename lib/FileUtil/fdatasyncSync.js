const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fdatasyncSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/fdatasync.2.html|fdatasync(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fdatasyncsync_fd}
 */
var fdatasyncSync = function (options) {
    var fd = _.get(options, 'fd');

    return fs.fdatasyncSync(fd);
};

module.exports = fdatasyncSync;
