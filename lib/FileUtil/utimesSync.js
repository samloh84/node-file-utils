const _ = require('lodash');

const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function utimesSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/utimes.2.html|utimes(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.atime
 * @param {Number} options.mtime
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_utimessync_path_atime_mtime}
 */
var utimesSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    var atime = _.get(options, 'atime');
    var mtime = _.get(options, 'mtime');

    return fs.utimesSync(path, atime, mtime);

};

module.exports = utimesSync;
