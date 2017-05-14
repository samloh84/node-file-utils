const _ = require('lodash');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function accessSync
 *
 * Tests a user's permissions for the file or directory specified by ```path```.
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} [options.mode] The mode argument is an optional integer that specifies the accessibility checks to be performed. The following constants define the possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values.
 * FileUtil.access.F_OK - path is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
 * FileUtil.access.R_OK - path can be read by the calling process.
 * FileUtil.access.W_OK - path can be written by the calling process.
 * FileUtil.access.X_OK - path can be executed by the calling process. This has no effect on Windows (will behave like FileUtil.access.F_OK).
 *
 * @returns {undefined}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_accesssync_path_mode}
 */
var accessSync = function (options) {
    var path = _.get(options, 'path');
    var mode = _.get(options, 'mode');

    path = _path.resolve(process.cwd(), path);

    return fs.accessSync(path, mode);
};

module.exports = accessSync;
