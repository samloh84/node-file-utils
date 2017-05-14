const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fsync
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/fsync.2.html|fsync(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback}
 */
var fsync = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.fsync(fd, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = fsync;
