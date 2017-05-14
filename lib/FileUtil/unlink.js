const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function unlink
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/unlink.2.html|unlink(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 *
 * @returns {Promise<String>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback}
 */
var unlink = function (options) {
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

            return fs.unlink(path, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = unlink;
