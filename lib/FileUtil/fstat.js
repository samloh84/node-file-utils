const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fstat
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/fstat.2.html|fstat(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 *
 * @returns {Promise<fs.Stats>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback}
 */
var fstat = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');

            var callback = function (err, stats) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve(stats);
            };

            return fs.fstat(fd, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = fstat;
