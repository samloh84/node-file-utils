const _ = require('lodash');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function closeSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/close.2.html|close(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_closesync_fd}
 */
var closeSync = function (options) {
    var fd = _.get(options, 'fd');
    return fs.closeSync(fd);
};

module.exports = closeSync;
