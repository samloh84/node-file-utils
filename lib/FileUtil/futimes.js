const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function futimes
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/futimes.2.html|futimes(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.atime
 * @param {Number} options.mtime
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback}
 */
var futimes = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');
            var atime = _.get(options, 'atime');
            var mtime = _.get(options, 'mtime');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.futimes(fd, atime, mtime, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = futimes;
