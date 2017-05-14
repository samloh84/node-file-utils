const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function stat
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/stat.2.html|stat(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * Using fs.stat() to check for the existence of a file before calling fs.open(), fs.readFile() or fs.writeFile() is not recommended. Instead, user code should open/read/write the file directly and handle the error raised if the file is not available.
 *
 * @returns {Promise<fs.Stats>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_stat_path_callback}
 */
var stat = function (options) {
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

            return fs.stat(path, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = stat;
