const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');
const _path = require('path');

/**
 * @memberOf FileUtil
 * @function truncate
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/truncate.2.html|truncate(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.len
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback}
 */
var truncate = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');
            var len = _.get(options, 'len');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.truncate(path, len, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = truncate;
