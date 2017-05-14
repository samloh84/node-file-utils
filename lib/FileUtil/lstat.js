const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function lstat
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/lstat.2.html|lstat(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * @returns {Promise<fs.Stats>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback}
 */
var lstat = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var callback = function (err, stats) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve(stats);
            };

            return fs.lstat(path, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = lstat;
