const _ = require('lodash');
const Promise = require('bluebird');
const fs = require('fs');

const _path = require('path');

/**
 * @memberOf FileUtil
 * @function lchmod
 *
 * Asynchronous {@link https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2|lchmod(2)}.
 *
 * Only available on Mac OS X.
 *
 * @param {Object} options
 * @param {Number} options.path
 * @param {Number} options.mode
 *
 * @returns {Promise<undefined>}
 * @see {@link https://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback}
 */
var lchmod = function (options) {
    return new Promise(function (resolve, reject) {
        try {
            var path = _.get(options, 'path');
            var mode = _.get(options, 'mode');

            if (_.isString(path) || _.isBuffer(path)) {
                path = _path.resolve(process.cwd(), path);
            }

            var callback = function (err) {
                if (!_.isNil(err)) {
                    return reject(err);
                }
                return resolve();
            };

            return fs.lchmod(path, mode, callback);

        } catch (err) {
            return reject(err);
        }

    });
};

module.exports = lchmod;
