const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function futimesSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/futimes.2.html|futimes(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.atime
 * @param {Number} options.mtime
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_futimessync_fd_atime_mtime}
 */
var futimesSync = function (options) {
    var fd = _.get(options, 'fd');
    var atime = _.get(options, 'atime');
    var mtime = _.get(options, 'mtime');

    return fs.futimesSync(fd, atime, mtime);
};

module.exports = futimesSync;
