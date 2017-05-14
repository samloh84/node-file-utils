const _ = require('lodash');

const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function statSync
 *
 * Synchronous {@link http://man7.org/linux/man-pages/man2/stat.2.html|stat(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * Using fs.stat() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Instead, user code should open/read/write the file directly and handle the error raised if the file is not available.
 *
 * @returns {fs.Stats}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_statsync_path}
 */
var statSync = function (options) {
    var path = _.get(options, 'path');

    if (_.isString(path) || _.isBuffer(path)) {
        path = _path.resolve(process.cwd(), path);
    }

    return fs.statSync(path);

};

module.exports = statSync;
