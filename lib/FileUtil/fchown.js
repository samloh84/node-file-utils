const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fchown
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/fchown.2.html|fchown(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.uid
 * @param {Number} options.gid
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback}
 */
var fchown = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');
            var uid = _.get(options, 'uid');
            var gid = _.get(options, 'gid');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.fchown(fd, uid, gid, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = fchown;
