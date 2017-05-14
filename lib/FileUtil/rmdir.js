const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function rmdir
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/rmdir.2.html|rmdir(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * @returns {Promise<String>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback}
 */
var rmdir = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.rmdir(path, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = rmdir;
