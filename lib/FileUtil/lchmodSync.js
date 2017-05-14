const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function lchmodSync
 *
 * Asynchronous {@link https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2|lchmod(2)}.
 *
 * Only available on Mac OS X.
 *
 * @param {Object} options
 * @param {Number} options.path
 * @param {Number} options.mode
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_lchmodsync_path_mode}
 */
var lchmodSync = function (options) {
    var path = _.get(options, 'path');
    var mode = _.get(options, 'mode');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.lchmodSync(path, mode);
};

module.exports = lchmodSync;
