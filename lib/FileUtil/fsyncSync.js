const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fsyncSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/fsync.2.html|fsync(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fsyncsync_fd}
 */
var fsyncSync = function (options) {
    var fd = _.get(options, 'fd');

    return fs.fsync(fd);

};

module.exports = fsyncSync;
