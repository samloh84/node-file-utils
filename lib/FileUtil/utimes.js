const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function utimes
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/utimes.2.html|utimes(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.atime
 * @param {Number} options.mtime
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback}
 */
var utimes = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var atime = _.get(options, 'atime');
            var mtime = _.get(options, 'mtime');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.utimes(path, atime, mtime, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = utimes;
