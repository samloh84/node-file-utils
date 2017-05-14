const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function lchown
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/lchown.2.html|lchown(2)}.
 *
 * @param {Object} options
 * @param {String|Buffer} options.path
 * @param {Number} options.uid
 * @param {Number} options.gid
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback}
 */
var lchown = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');
            var uid = _.get(options, 'uid');
            var gid = _.get(options, 'gid');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.lchown(path, uid, gid, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = lchown;
