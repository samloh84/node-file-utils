const _ = require('lodash');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function chownSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/chown.2.html|chown(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.uid
 * @param {Number} options.gid
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_chownsync_path_uid_gid}
 */
var chownSync = function (options) {
    var path = _.get(options, 'path');
    var uid = _.get(options, 'uid');
    var gid = _.get(options, 'gid');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.chownSync(path, uid, gid);
};

module.exports = chownSync;
