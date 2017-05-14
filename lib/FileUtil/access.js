const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function access
 *
 * Tests a user's permissions for the file or directory specified by ```path```.
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} [options.mode] The mode argument is an optional integer that specifies the accessibility checks to be performed. The following constants define the possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values.
 * FileUtil.constants.F_OK - path is visible to the calling process. This is useful for determining if a file exists, but says nothing about rwx permissions. Default if no mode is specified.
 * FileUtil.constants.R_OK - path can be read by the calling process.
 * FileUtil.constants.W_OK - path can be written by the calling process.
 * FileUtil.constants.X_OK - path can be executed by the calling process. This has no effect on Windows (will behave like FileUtil.constants.F_OK).
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_access_path_mode_callback}
 */
var access = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');
            var mode = _.get(options, 'mode');

            path = _path.resolve(process.cwd(), path);

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.access(path, mode, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = access;
