const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function renameSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/link.2.html|link(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.oldPath
 * @param {String|Buffer} options.newPath
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_renamesync_oldpath_newpath}
 */
var renameSync = function (options) {
    var oldPath = _.get(options, 'oldPath');
    var newPath = _.get(options, 'newPath');

    if (_.isString(oldPath) || _.isBuffer(oldPath)) {
        oldPath = _path.resolve(process.cwd(), oldPath);
    }

    if (_.isString(newPath) || _.isBuffer(newPath)) {
        newPath = _path.resolve(process.cwd(), newPath);
    }

    return fs.renameSync(oldPath, newPath);
};

module.exports = renameSync;
