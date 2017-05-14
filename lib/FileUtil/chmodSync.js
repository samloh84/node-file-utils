const _ = require('lodash');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function chmodSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/chmod.2.html|chmod(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.mode
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_chmodsync_path_mode}
 */
var chmodSync = function (options) {
    var path = _.get(options, 'path');
    var mode = _.get(options, 'mode');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.chmodSync(path, mode);
};

module.exports = chmodSync;
