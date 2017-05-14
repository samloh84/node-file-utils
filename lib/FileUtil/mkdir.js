const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function mkdir
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/mkdir.2.html|mkdir(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} [options.mode]
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback}
 */
var mkdir = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');
            var mode = _.get(options, 'mode');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var mkdirArgs = [path];

            if (!_.isNil(mode)) {
                mkdirArgs.push(mode);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            mkdirArgs.push(callback);

            return fs.mkdir.apply(fs, mkdirArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = mkdir;
