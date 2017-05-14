const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function rmdirSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/rmdir.2.html|rmdir(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_rmdirsync_path}
 */
var rmdirSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.rmdirSync(path);
};

module.exports = rmdirSync;
