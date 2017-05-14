const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function chmod
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/chmod.2.html|chmod(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.mode
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback}
 */
var chmod = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');
            var mode = _.get(options, 'mode');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.chmod(path, mode, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = chmod;
