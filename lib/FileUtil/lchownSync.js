const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function lchownSync
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/lchown.2.html|lchown(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.uid
 * @param {Number} options.gid
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_lchownsync_path_uid_gid}
 */
var lchownSync = function (options) {
    var path = _.get(options, 'path');
    var uid = _.get(options, 'uid');
    var gid = _.get(options, 'gid');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.lchownSync(path, uid, gid);

};

module.exports = lchownSync;
