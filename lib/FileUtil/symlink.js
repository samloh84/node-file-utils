const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function symlink
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/symlink.2.html|symlink(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.target
 * @param {String|Buffer} options.path
 * @param {String} [options.type=file] The type argument can be set to 'dir', 'file', or 'junction' (default is 'file') and is only available on Windows (ignored on other platforms).
 *
 * Note that Windows junction points require the destination path to be absolute. When using 'junction', the target argument will automatically be normalized to absolute path.
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_symlink_target_path_type_callback}
 */
var symlink = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var target = _.get(options, 'target');
            var path = _.get(options, 'path');

            if (_.isString(target) || _.isBuffer(target)) {
                target = _path.resolve(process.cwd(), target);
            }

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var symlinkArgs = [target, path];

            var type = _.get(options, 'type');

            if (!_.isNil(type)) {
                symlinkArgs.push(type);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            symlinkArgs.push(callback);

            return fs.symlink.apply(fs, symlinkArgs);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = symlink;
