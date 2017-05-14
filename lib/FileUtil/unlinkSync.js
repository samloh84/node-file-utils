const _ = require('lodash');

const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function unlinkSync
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/unlink.2.html|unlink(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * @returns {String}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_unlinksync_path}
 */
var unlinkSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.unlinkSync(path);

};

module.exports = unlinkSync;
