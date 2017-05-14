const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

/**
 * @memberOf FileUtil
 * @function fchmod
 *
 * Asynchronous {@link http://man7.org/linux/man-pages/man2/fchmod.2.html|fchmod(2)}.
 *
 * @param {Object} options
 * @param {Number} options.fd
 * @param {Number} options.mode
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback}
 */
var fchmod = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var fd = _.get(options, 'fd');
            var mode = _.get(options, 'mode');

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.fchmod(fd, mode, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = fchmod;
