const _ = require('lodash');

const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function lstatSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/lstat.2.html|lstat(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * @returns {fs.Stats}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_lstatsync_path}
 */
var lstat = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.lstatSync(path);

};

module.exports = lstat;
