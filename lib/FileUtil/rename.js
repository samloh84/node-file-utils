const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function rename
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/link.2.html|link(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.oldPath
 * @param {String|Buffer} options.newPath
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback}
 */
var rename = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var oldPath = _.get(options, 'oldPath');
            var newPath = _.get(options, 'newPath');

            if (_.isString(oldPath) || _.isBuffer(oldPath)) {
                oldPath = _path.resolve(process.cwd(), oldPath);
            }

            if (_.isString(newPath) || _.isBuffer(newPath)) {
                newPath = _path.resolve(process.cwd(), newPath);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.rename(oldPath, newPath, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = rename;
