const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function mkdirSync
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/mkdir.2.html|mkdir(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} [options.mode]
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_mode}
 */
var mkdirSync = function (options) {
    var path = _.get(options, 'path');
    var mode = _.get(options, 'mode');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var mkdirSyncArgs = [path];

    if (!_.isNil(mode)) {
        mkdirSyncArgs.push(mode);
    }

    return fs.mkdirSync.apply(fs, mkdirSyncArgs);
};

module.exports = mkdirSync;
