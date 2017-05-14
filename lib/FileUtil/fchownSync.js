const _ = require('lodash');

const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fchownSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/fchown.2.html|fchown(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.uid
 * @param {Number} options.gid
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fchownsync_fd_uid_gid}
 */
var fchown = function (options) {
    var fd = _.get(options, 'fd');
    var uid = _.get(options, 'uid');
    var gid = _.get(options, 'gid');

    return fs.fchownSync(fd, uid, gid);

};

module.exports = fchown;
