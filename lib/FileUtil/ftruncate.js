const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function ftruncate
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/ftruncate.2.html|ftruncate(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.len
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback}
 */
var ftruncate = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');
            var len = _.get(options, 'len');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.ftruncate(fd, len, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = ftruncate;
