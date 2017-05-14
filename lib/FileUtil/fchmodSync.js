const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fchmodSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/fchmod.2.html|fchmod(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.mode
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fchmodsync_fd_mode}
 */
var fchmodSync = function (options) {
    var fd = _.get(options, 'fd');
    var mode = _.get(options, 'mode');

    return fs.fchmodSync(fd, mode);

};

module.exports = fchmodSync;
