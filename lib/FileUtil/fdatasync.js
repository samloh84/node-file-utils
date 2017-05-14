const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fdatasync
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/fdatasync.2.html|fdatasync(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fdatasync_fd_callback}
 */
var fdatasync = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.fdatasync(fd, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = fdatasync;
