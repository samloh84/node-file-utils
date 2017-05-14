const _ = require('lodash');

const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function truncateSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/truncate.2.html|truncate(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.len
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_truncatesync_path_len}
 */
var truncateSync = function (options) {
    var path = _.get(options, 'path');
    var len = _.get(options, 'len');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.truncateSync(path, len);
};

module.exports = truncateSync;
